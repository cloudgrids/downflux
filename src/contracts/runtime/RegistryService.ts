export interface RegistryService {
	name: string;
	parser?: boolean;
	pipeline?: boolean;
	transformer?: boolean;
	strategy?: boolean;
	method?: boolean;
}
