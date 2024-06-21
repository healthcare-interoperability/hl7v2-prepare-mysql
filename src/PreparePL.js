import { PrepareField } from "./PrepareField";
import { PL, HD } from '@healthcare-interoperability/hl7v2-datatypes';

export class PreparePL extends PrepareField {
    /**
       * Constructs a new PrepareCXField instance.
       * @param {string} field - The field name.
       * @param {PL} data - The CX data associated with the field.
       */
    constructor(field, data) {
      if (data instanceof PL) {
        super(field, data);
      } else {
        throw new Error(`Not a valid instance of PL !!`)
      }
    }
  
    prepareHDData(data) {
      if (data) {
        try {
          let typeCastedHD = new TypeCastHD(data).typecast();
          if (typeCastedHD && typeCastedHD instanceof HD) {
            return typeCastedHD?.NamespaceID?.toString();
          }
        } catch (e) {
          console.log(e);
        }
      }
      return null;
    }
  
    /**
    * Prepares the CX field for saving records.
    * @returns {Object|null} The prepared field object or null if data is invalid.
    */
    prepare() {
      super.prepare();
      let field = null;
      if (this.data instanceof PL) {
        let preparedFields = {
          pl_point_of_care: this.prepareHDData(this.data.PointOfCare),
          pl_room: this.prepareHDData(this.data.Room),
          pl_bed: this.prepareHDData(this.data.Bed),
          pl_building: this.prepareHDData(this.data.Building),
          pl_floor: this.prepareHDData(this.data.Floor),
          pl_facility: this.prepareHDData(this.data.Facility),
          pl_person_location_type: this.prepareHDData(this.data.PersonLocationType)
        };
  
        const isEmpty = Object.values(preparedFields).every(x => x === null || x === '');
        if (!isEmpty) {
          field = this.prepareField(preparedFields);
        }
      }
      return field;
    }
  }
  