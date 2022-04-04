import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export default function LoadingOverlay({
	isLoading = false,
	inverted = true,
	content = 'Loading...',
	props
}) {
	return (
		<Dimmer
			inverted={inverted}
			active={isLoading}
			{...props}
		>
			<Loader content={content} />
		</Dimmer>
	);
}
