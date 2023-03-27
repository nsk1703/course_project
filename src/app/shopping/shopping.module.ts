import { NgModule } from '@angular/core';
import { ShoppingRoutingModule} from './shopping-routing.module';

import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SharedLibsModule } from '../shared/shared-libs.module';


@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        SharedLibsModule,
        ShoppingRoutingModule
    ],
})
export class ShoppingModule {}