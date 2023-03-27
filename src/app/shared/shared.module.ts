import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirectives } from "./dropdown.directive";
import { LoadingComponent } from "./loading-service/loading.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { SharedLibsModule } from "./shared-libs.module";

@NgModule({
    declarations: [
        LoadingComponent,
        AlertComponent,
        PlaceholderDirective,
        DropdownDirectives,
    ],
    imports: [
        SharedLibsModule
    ],
    exports: [
        LoadingComponent,
        AlertComponent,
        PlaceholderDirective,
        DropdownDirectives,
        SharedLibsModule
    ],
    entryComponents: [
        AlertComponent
    ],
})
export class SharedModule {}