import { MatrixModule } from './matrix.module';

describe('MatrixModule', () => {
  let matrixModule: MatrixModule;

  beforeEach(() => {
    matrixModule = new MatrixModule();
  });

  it('should create an instance', () => {
    expect(matrixModule).toBeTruthy();
  });
});
