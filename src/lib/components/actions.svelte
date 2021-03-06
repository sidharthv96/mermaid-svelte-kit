<script lang="ts">
	import Card from '$lib/components/card/card.svelte';
	import { base64State } from '$lib/util/state';

	import { toBase64 } from 'js-base64';
	import moment from 'moment';

	type Exporter = (
		canvas: HTMLCanvasElement,
		context: CanvasRenderingContext2D,
		image: HTMLImageElement
	) => () => void;

	const getBase64SVG = (): string => {
		const container: HTMLElement = document.getElementById('container');
		const svg = container.innerHTML.replaceAll('<br>', '<br/>');
		return toBase64(svg);
	};

	const exportImage = (event: Event, exporter: Exporter) => {
		const canvas: HTMLCanvasElement = document.createElement('canvas');
		const svg: HTMLElement = document.querySelector('#container svg');
		debugger;
		const box: DOMRect = svg.getBoundingClientRect();
		canvas.width = box.width;
		canvas.height = box.height;
		if (imagemodeselected === 'width') {
			const ratio = box.height / box.width;
			canvas.width = userimagesize;
			canvas.height = userimagesize * ratio;
		} else if (imagemodeselected === 'height') {
			const ratio = box.width / box.height;
			canvas.width = userimagesize * ratio;
			canvas.height = userimagesize;
		}
		const context = canvas.getContext('2d');
		context.fillStyle = 'white';
		context.fillRect(0, 0, canvas.width, canvas.height);

		const image = new Image();
		image.onload = exporter(canvas, context, image);

		image.src = `data:image/svg+xml;base64,${getBase64SVG()}`;
		event.stopPropagation();
		event.preventDefault();
	};

	const simulateDownload = (download: string, href: string): void => {
		const a = document.createElement('a');
		a.download = download;
		a.href = href;
		a.click();
		a.remove();
	};
	const downloadImage: Exporter = (canvas, context, image) => {
		return () => {
			context.drawImage(image, 0, 0, canvas.width, canvas.height);
			simulateDownload(
				`mermaid-diagram-${moment().format('YYYYMMDDHHmmss')}.png`,
				canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
			);
		};
	};

	const isClipboardAvailable = () => {
		return window?.hasOwnProperty('ClipboardItem');
	};

	const clipboardCopy: Exporter = (canvas, context, image) => {
		return () => {
			context.drawImage(image, 0, 0, canvas.width, canvas.height);

			canvas.toBlob((blob) => {
				try {
					// @ts-ignore
					navigator.clipboard.write([
						// @ts-ignore
						new ClipboardItem({
							[blob.type]: blob
						})
					]);
				} catch (error) {
					console.error(error);
				}
			});
		};
	};

	const onCopyClipboard = (event) => {
		exportImage(event, clipboardCopy);
	};

	const onDownloadPNG = (event) => {
		exportImage(event, downloadImage);
	};

	const onDownloadSVG = (event) => {
		simulateDownload(
			`mermaid-diagram-${moment().format('YYYYMMDDHHmmss')}.svg`,
			`data:image/svg+xml;base64,${getBase64SVG()}`
		);
	};

	const onCopyMarkdown = (event) => {
		event.target.select();
		document.execCommand('Copy');
	};

	let iUrl;
	let svgUrl;
	let mdCode;
	let imagemodeselected = 'auto';
	let userimagesize = 1080;

	const unsubscribe = base64State.subscribe((b64Code) => {
		iUrl = `https://mermaid.ink/img/${b64Code}`;
		svgUrl = `https://mermaid.ink/svg/${b64Code}`;
		mdCode = `[![](${iUrl})](${window.location.protocol}//${window.location.host}${window.location.pathname}/edit#${b64Code})`;
	});
</script>

<Card title="Actions" isOpen={false}>
	<div class="flex flex-wrap gap-2 m-2">
		{#if isClipboardAvailable()}
			<button class="btn w-full" on:click={onCopyClipboard}
				><i class="far fa-copy" /> Copy Image to clipboard
			</button>
		{/if}
		<button class="btn flex-auto" on:click={onDownloadPNG}>
			<i class="fas fa-download" /> PNG
		</button>
		<button class="btn flex-auto" on:click={onDownloadSVG}>
			<i class="fas fa-download" /> SVG
		</button>
		<button class="btn flex-auto">
			<a class="link-style" target="_blank" href={iUrl}
				><i class="fas fa-external-link-alt" /> PNG</a>
		</button>
		<button class="btn flex-auto">
			<a class="link-style" target="_blank" href={svgUrl}
				><i class="fas fa-external-link-alt" /> SVG</a>
		</button>

		<div class="flex gap-2 items-center">
			PNG size
			<input type="radio" value="auto" id="autosize" bind:group={imagemodeselected} />
			<label for="autosize">Auto</label>
			<input type="radio" value="width" id="width-active" bind:group={imagemodeselected} />
			<label for="width">Width</label>
			<input type="radio" value="height" id="height-active" bind:group={imagemodeselected} />
			<label for="height">Height</label>
			{#if imagemodeselected !== 'auto'}
				<input id="height" type="number" min="3" max="10000" bind:value={userimagesize} />
			{/if}
		</div>

		<div class="w-full flex gap-2 items-center">
			<label for="markdown">Copy Markdown</label>
			<input class="flex-1" id="markdown" type="text" value={mdCode} on:click={onCopyMarkdown} />
		</div>
	</div>
</Card>

<style>
	.btn {
		@apply rounded p-2 bg-indigo-400 shadow flex-auto text-white hover:bg-indigo-500;
	}
</style>
