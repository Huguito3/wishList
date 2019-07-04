import { NgModule } from '@angular/core';
import { FiltroCompletadoPipe } from './filtro-completado.pipe';
// import { CommonModule } from '@angular/common';
// comentado porque no vamos a usar ngif.. ngfor etc.
@NgModule({
  declarations: [FiltroCompletadoPipe],
  exports: [FiltroCompletadoPipe]
  // imports: [
  //   CommonModule
  // ]
})
export class PipesModule { }
