import { dataService } from "../service/dataService.js";

export async function deleteItem(ctx) {
    const confitm = confirm('Are you sure');
    const id = ctx.params.id;
    
    if (confitm) {
        await dataService.delFurniture(id);
        ctx.goTo('/');
    }
}