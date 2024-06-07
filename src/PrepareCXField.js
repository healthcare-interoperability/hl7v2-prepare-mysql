import { PrepareField } from "./PrepareField";
import { CX } from "@healthcare-interoperability/hl7v2-datatypes";
import { HL7v2MySQLUtils } from "@healthcare-interoperability/hl7v2-utils-mysql";

/**
 * Represents a class for preparing CX fields for saving records.
 * Extends PrepareField class.
 */
export class PrepareCXField extends PrepareField {
    /**
     * Constructs a new PrepareCXField instance.
     * @param {string} field - The field name.
     * @param {CX} data - The CX data associated with the field.
     */
    constructor(field, data) {
        if (data instanceof CX) {
            super(field, data);
        }
    }

    /**
     * Prepares the CX field for saving records.
     * @returns {Object|null} The prepared field object or null if data is invalid.
     */
    prepare() {
        super.prepare();
        let field = null;
        if (this.data instanceof CX) {
            let identifier = HL7v2MySQLUtils.validateString(this.data.IdNumber);
            if (identifier) {
                field = this.prepareField({
                    cx_id_number: identifier,
                    cx_id_assign_auth: HL7v2MySQLUtils.prepareComplexData(this.data.AssigningAuthority),
                    cx_id_type: HL7v2MySQLUtils.prepareComplexData(this.data.IdentifierTypeCode),
                    cx_id_effective_date: HL7v2MySQLUtils.validateDTM(this.data.EffectiveDate),
                    cx_id_expiry_date: HL7v2MySQLUtils.validateDTM(this.data.ExpirationDate)
                });
            }
        }
        return field;
    }
}
