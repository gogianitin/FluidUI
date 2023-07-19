import { Well } from "../model/well.model";
import { WellSearch } from "../model/well-search.model";
import { Observable, Subject } from "rxjs";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {db} from "src/environments/environment";
import { getDocs, collection, query, where, or, and, updateDoc, serverTimestamp, doc, deleteDoc} from "firebase/firestore";
import { SearchRecordComponent } from "../search-record/search-record.component";

export class WellService{

   

    wellDataChanged = new Subject<Well[]>();
    
    private wells: Well[]=[
    ];
    

   




    getAllWells(){
        //return this.getSnapsot();
        return this.getSnapsot();
    }

    async getSnapsot() {
        const tempWells: Well[] = [];
        const querySnapshot = await getDocs(collection(db, 'wellData'));
        querySnapshot.forEach((doc) => {
          const uwi: string = doc.data()['uwi'];
          const state: string = doc.data()['state'];
          const wellname: string = doc.data()['wellname'];
      
          const tempWell: Well = { uwi, wellname, state };
          tempWells.push(tempWell);
        });
      
        this.wells = tempWells;
        return this.wells;
      }


    async searchWell(searchCriteria:WellSearch)
    {
        const tempWells: Well[] = [];

        this.getSnapsot();
        const wellsRef = collection(db, 'wellData');
        const q = query(wellsRef, or(where("uwi", "==", searchCriteria.uwi) , where("state", "==", searchCriteria.state), where("wellname", "==", searchCriteria.wellname)));
        const qSnapshot = await getDocs(q);
        qSnapshot.forEach((doc) => {

            const uwi: string = doc.data()['uwi'];
            const state: string = doc.data()['state'];
            const wellname: string = doc.data()['wellname'];
            const tempWell: Well = { uwi, wellname, state };
            tempWells.push(tempWell);

          });

        this.wells = tempWells;

        return this.wells;
    }

    async updateWell(searchCriteria: WellSearch) {
          const tempWellname = String(searchCriteria.wellname);
          const docRef = doc(db, 'wellData', tempWellname); // Corrected line
          console.log(docRef.id);
          await updateDoc(docRef, {
            uwi: searchCriteria.uwi,
            state: searchCriteria.state,
            wellname: searchCriteria.wellname
            // Add other fields to update as needed
          });
          this.getAllWells()
      }

      async deleteWell(searchCriteria: WellSearch) {
        const tempWellname = String(searchCriteria.wellname);
        await deleteDoc(doc(db, "wellData", tempWellname));
        this.getAllWells();
    }
      
      

    addWell(well:Well){
        this.wells.push(well);
        this.wellDataChanged.next({...this.wells});
    }

}