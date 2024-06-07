import { PrepareField } from "./PrepareField";
import { XTN } from "@healthcare-interoperability/hl7v2-datatypes";
import { HL7v2MySQLUtils } from "@healthcare-interoperability/hl7v2-utils-mysql";

/**
 * Represents a class for preparing XTN fields for saving records.
 * Extends PrepareField class.
 */
export class PrepareXTNField extends PrepareField {
    /**
     * Constructs a new PrepareXTNField instance.
     * @param {string} field - The field name.
     * @param {XTN} data - The XTN data associated with the field.
     */
    constructor(field, data) {
        if (data instanceof XTN) {
            super(field, data);
        }
    }

    /**
     * Prepares the XTN field for saving records.
     * @returns {Object|null} The prepared field object or null if data is invalid.
     */
    prepare() {
        super.prepare();
        let field = null;

        if (this.data instanceof XTN) {
            let unformatted_telephone_no = HL7v2MySQLUtils.validateString(this.data.UnformattedTelephoneNumber);
            let telephone_no = HL7v2MySQLUtils.validateString(this.data.PhoneNumber);

            if (unformatted_telephone_no || telephone_no) {
                field = this.prepareField({
                    xtn_type: HL7v2MySQLUtils.validateString(this.data.TelecommunicationEquipmentType),
                    xtn_address: HL7v2MySQLUtils.validateString(this.data.CommunicationAddress),
                    xtn_email_address: HL7v2MySQLUtils.validateString(this.data.EmailAddress),
                    xtn_country_code: HL7v2MySQLUtils.validateString(this.data.CountryCode),
                    xtn_city_code: HL7v2MySQLUtils.validateString(this.data.AreaCityCode),
                    xtn_local_number: telephone_no,
                    xtn_prefix:HL7v2MySQLUtils.validateString(this.data.ExtensionPrefix),
                    xtn_unformatted_no: unformatted_telephone_no
                });
            }
        }
        return field;
    }
}
