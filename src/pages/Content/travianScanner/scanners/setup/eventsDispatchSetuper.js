import { setVillages } from '../../../reduxStore/villages';

export class EventsDispatchSetuper {
  setupDispatching(dispatch, events) {
    events['Villages.onVillagesScanned'].addEventListener((data) =>{
      dispatch(setVillages(data));
    });
  }
}