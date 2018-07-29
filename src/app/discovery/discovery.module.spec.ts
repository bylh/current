import { DiscoveryModule } from './discovery.module';

describe('DiscoveryModule', () => {
  let discoveryModule: DiscoveryModule;

  beforeEach(() => {
    discoveryModule = new DiscoveryModule();
  });

  it('should create an instance', () => {
    expect(discoveryModule).toBeTruthy();
  });
});
