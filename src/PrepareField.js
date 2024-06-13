/**
 * Represents a class for preparing fields for saving records.
 */
export class PrepareField {
    /**
     * Constructs a new PrepareField instance.
     * @param {string} field - The field name.
     * @param {*} data - The data associated with the field.
     * @throws {Error} If field name is missing.
     */
    constructor(field, data) {
        if (field) {
            this.field = field;
            this.data = data;
            this.sid = 1;
            this.entryCount = 1;
            this.groupId = 'PARENT';
            this.groupEntry = 1;
        } else {
            throw new Error(`Field name is missing. Please provide a valid field name.`);
        }
    }

    /**
     * Sets the message ID.
     * @param {string} messageId - The message ID to set.
     * @returns {PrepareField} The current instance for chaining.
     */
    setMessageId(messageId) {
        this.messageId = messageId;
        return this;
    }

    /**
     * Sets the SID (System Identifier).
     * @param {string} sid - The SID to set.
     * @returns {PrepareField} The current instance for chaining.
     */
    setSID(sid) {
        this.sid = sid;
        return this;
    }

    /**
     * Sets the group ID.
     * @param {number} groupId - The group ID to set.
     * @returns {PrepareField} The current instance for chaining.
     */
    setGroupId(groupId) {
        this.groupId = groupId;
        return this;
    }

    /**
    * Set the groupEntry.
    * @param {string} groupEntry - The group groupEntry to set.
    */
    setGroupEntry(groupEntry) {
        this.groupEntry = groupEntry;
        return this;
    }
    

    /**
     * Sets the entry count in the group.
     * @param {number} entryCount - The entry count to set.
     * @returns {PrepareField} The current instance for chaining.
     */
    setEntryCount(entryCount) {
        this.entryCount = entryCount;
        return this;
    }

    /**
     * Sets the segment.
     * @param {string} segment - The segment to set.
     * @returns {PrepareField} The current instance for chaining.
     */
    setSegment(segment) {
        this.segment = segment;
        return this;
    }

    /**
     * Prepares the field with the provided data.
     * @param {Object} data - The data to include in the prepared field.
     * @returns {Object} The prepared field object.
     */
    prepareField(data) {
        return {
            msg_id: this.messageId,
            msg_segment: this.segment,
            msg_sid: this.sid,
            msg_group_id: this.groupId,
            msg_group_entry: this.groupEntry,
            msg_field_entry: this.entryCount,
            msg_field_type: this.field,
            ...data
        };
    }

    /**
     * Prepares the field for saving records.
     * @throws {Error} If message ID or segment data is missing.
     */
    prepare() {
        if (!this.messageId) {
            throw new Error(`Message ID is required for saving the record. Please set the message ID before preparing.`);
        }
        if (!this.segment) {
            throw new Error(`Segment data is missing. Please set the segment data before preparing.`);
        }
    }
}
