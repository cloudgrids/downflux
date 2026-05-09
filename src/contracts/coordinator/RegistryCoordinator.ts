export interface RegistryCoordinator {
	name: string;
	parser?: boolean;
	pipeline?: boolean;
	transformer?: boolean;
	strategy?: boolean;
	method?: boolean;
}
