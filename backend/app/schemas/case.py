from pydantic import BaseModel, EmailStr, field_validator, model_validator, ConfigDict
from typing import Optional, List
from datetime import date

class CaseBase(BaseModel):
    # Pflichtfelder werden aus CaseBase entfernt, damit sie in CaseCreate als Pflichtfelder ohne Default gesetzt werden können
    # name: Optional[str] = None
    # age: Optional[int] = None
    # status: Optional[str] = None
    # date_reported: Optional[date] = None
    # region: Optional[str] = None
    symptoms: Optional[List[str]] = None
    contacts: Optional[int] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    user_app_id: Optional[str] = None
    test_date: Optional[date] = None
    test_result: Optional[str] = None
    notes: Optional[str] = None
    contact_history: Optional[List[dict]] = None
    measures: Optional[List[dict]] = None


class CaseCreate(CaseBase):
    name: str
    age: int
    status: str
    date_reported: date
    region: str
    user_app_id: str

    @field_validator('name')
    @classmethod
    def name_must_be_valid(cls, v):
        import re
        if len(v.strip()) < 2:
            raise ValueError('Name muss mindestens 2 Zeichen lang sein')
        if not re.match(r'^[A-Za-zÄÖÜäöüß\s-]+$', v):
            raise ValueError('Name darf nur Buchstaben, Leerzeichen und Bindestriche enthalten')
        return v

    @field_validator('age')
    @classmethod
    def age_must_be_valid(cls, v):
        if not (0 <= v <= 120):
            raise ValueError('Alter muss zwischen 0 und 120 liegen')
        return v

    @field_validator('date_reported')
    @classmethod
    def date_reported_not_in_future(cls, v):
        from datetime import date
        if v > date.today():
            raise ValueError('Das Erkrankungsdatum darf nicht in der Zukunft liegen')
        return v

    @field_validator('phone')
    @classmethod
    def phone_format(cls, v):
        if v is not None:
            import re
            if not re.match(r'^[\d\s+\-()]+$', v):
                raise ValueError('Telefonnummer darf nur Ziffern, Leerzeichen, +, - und Klammern enthalten')
        return v

    @model_validator(mode='after')
    def check_test_date_after_reported(self):
        if self.test_date and self.date_reported and self.test_date < self.date_reported:
            raise ValueError('Testdatum darf nicht vor Erkrankungsdatum liegen')
        return self

    model_config = ConfigDict(from_attributes=True)

class CaseUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    user_app_id: Optional[str] = None
    status: Optional[str] = None
    symptoms: Optional[List[str]] = None
    locations: Optional[List[str]] = None
