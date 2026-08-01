import { Tldraw, TLEditorComponents, useEditor } from 'tldraw'
import 'tldraw/tldraw.css'
import './crash-event-handling.css'

// There's a guide at the bottom of this file!

// [1]
function reportToErrorService(error: unknown) {
	console.error('Editor crashed:', error)
}

// [2]
const components: TLEditorComponents = {
	InFrontOfTheCanvas: () => {
		const editor = useEditor()
		return (
			<button
				className="crash-event-handling__button"
				onClick={() => {
					editor.createShape({
						// @ts-expect-error
						type: 'does-not-exist',
					})
				}}
			>
				Crash the editor
			</button>
		)
	},
}

export default function CrashEventHandlingExample() {
	return (
		<div className="tldraw__editor">
			<Tldraw
				components={components}
				onMount={(editor) => {
					// [3]
					const handleCrash = ({ error }: { error: unknown }) => {
						reportToErrorService(error)
					}
					editor.on('crash', handleCrash)

					// [4]
					return () => {
						editor.off('crash', handleCrash)
					}
				}}
			/>
		</div>
	)
}

/*
[1]
In a real application this is where you would send the error to your error tracking service, such as
Sentry. Here we just log it to the console.

[2]
For this example, we've added a button using the InFrontOfTheCanvas component that intentionally
triggers a fatal error so you can see the crash event in action. We trigger it by creating a shape
with an invalid type.

[3]
The editor emits a crash event when it hits a fatal error while processing an event. Once crashed,
the editor stops processing new events and the ErrorFallback component takes over, so this event is
your chance to report the error yourself.

[4]
Return a cleanup function from onMount to remove the listener when the editor unmounts.
*/
