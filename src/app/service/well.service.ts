import { Well } from "../model/well.model";
import { WellSearch } from "../model/well-search.model";
import { Subject } from "rxjs";

export class WellService{


    wellDataChanged = new Subject<Well[]>();
    private wells: Well[]=[
        {uwi:"12341234",wellname:"well1",state:"Texas"},
        {uwi:"12341235",wellname:"well2",state:"Texas"},
        {uwi:"12341236",wellname:"well3",state:"Texas"},
        {uwi:"12341237",wellname:"well4",state:"Texas"},
    ];

    getAllWells(){
        return this.wells.slice();
    }

    searchWell(searchCriteria:WellSearch){
        return this.wells.filter(w=>((w.uwi===searchCriteria.uwi)||(w.state===searchCriteria.state)||(w.wellname===searchCriteria.wellname)));
    }

    addWell(well:Well){
        this.wells.push(well);
        this.wellDataChanged.next({...this.wells});
    }

    deleteWell(well:Well){
        this.wells = this.wells.filter(w=>((w.uwi!=well.uwi)));
        this.wellDataChanged.next({...this.wells});
    }
}