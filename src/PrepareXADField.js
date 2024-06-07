import { PrepareField } from "./PrepareField";
import { XAD } from "@healthcare-interoperability/hl7v2-datatypes";
import { HL7v2MySQLUtils } from "@healthcare-interoperability/hl7v2-utils-mysql";
import { TypeCastSAD } from "@healthcare-interoperability/hl7v2-typecast";

/**
 * Represents a class for preparing XAD fields for saving records.
 * Extends PrepareField class.
 */
export class PrepareXADField extends PrepareField {
    /**
     * Constructs a new PrepareXADField instance.
     * @param {string} field - The field name.
     * @param {XAD} data - The XAD data associated with the field.
     */
    constructor(field, data) {
        if (data instanceof XAD) {
            super(field, data);
        }
    }

    /**
     * Prepares the XAD field for saving records.
     * @returns {Object|null} The prepared field object or null if data is invalid.
     */
    prepare() {
        super.prepare();
        let field = null;

        if (this.data instanceof XAD) {
            if(this.data.StreetAddress){
                let street_address = new TypeCastSAD(this.data.StreetAddress).typecast();
                let xad_mailing_address = HL7v2MySQLUtils.validateString(street_address.StreetOrMailingAddress);
                let xad_zip = HL7v2MySQLUtils.validateString(this.data.ZipOrPostalCode);
    
                if (xad_mailing_address) {
                    field = this.prepareField({
                        xad_mailing_address,
                        xad_street_name: HL7v2MySQLUtils.validateString(street_address?.StreetName),
                        xad_dwelling_number: HL7v2MySQLUtils.validateString(street_address?.DwellingNumber),
                        xad_other_designation: HL7v2MySQLUtils.validateString(this.data.OtherDesignation),
                        xad_city: HL7v2MySQLUtils.validateString(this.data.City),
                        xad_state: HL7v2MySQLUtils.validateString(this.data.StateOrProvince),
                        xad_zip,
                        xad_normalized_zip: xad_zip?.substring(0, 5) ?? null,
                        xad_country: HL7v2MySQLUtils.validateString(this.data.Country),
                        xad_address_type: HL7v2MySQLUtils.validateString(this.data.AddressType)
                    });
                }
            }
        }
        return field;
    }
}
