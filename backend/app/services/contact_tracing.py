def find_close_contacts(cases, contacts, case_id):
    return [c.contact_name for c in contacts if c.case_id == case_id]
