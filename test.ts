function filterByExt(pipelineItems: string[], allowedExtensions?: string[]): string[] {
	return pipelineItems.filter((item) => allowedExtensions?.includes(item));
}

console.log(filterByExt(['jpg', 'png', 'mp4'])); // Returns ['jpg', 'mp4']
