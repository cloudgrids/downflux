import { ServiceFetchStrategy, ServiceType } from '../util';
import { PornHubFetchStrategy } from './PornHubFetchStrategy';

const strategies: Partial<Record<ServiceType, ServiceFetchStrategy>> = {
	[ServiceType.PornHub]: PornHubFetchStrategy
};

export const getFetchStrategy = (service: ServiceType) => {
	return strategies[service];
};
