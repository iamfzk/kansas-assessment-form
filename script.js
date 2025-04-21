document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('assessmentForm');
    
    // Show/hide permanent residence field based on selection
    const permanentRadios = document.querySelectorAll('input[name="permanent"]');
    const permanentResidenceGroup = document.getElementById('permanentResidenceGroup');
    
    permanentRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        if (this.value === 'No') {
          permanentResidenceGroup.style.display = 'block';
        } else {
          permanentResidenceGroup.style.display = 'none';
        }
      });
    });
    
    // Show/hide interpreter type field based on selection
    const interpreterRadios = document.querySelectorAll('input[name="interpreter"]');
    const interpreterTypeGroup = document.getElementById('interpreterTypeGroup');
    
    interpreterRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        if (this.value === 'Yes') {
          interpreterTypeGroup.style.display = 'block';
        } else {
          interpreterTypeGroup.style.display = 'none';
        }
      });
    });
    
    // Handle emergency contact same as guardian
    const sameAsGuardianCheckbox = document.querySelector('input[name="sameAsGuardian"]');
    const guardianFields = [
      'guardianName', 'guardianRelationship', 'guardianStreet', 'guardianCity',
      'guardianCounty', 'guardianState', 'guardianZip', 'guardianPhone',
      'guardianEmail', 'guardianAltPhone'
    ];
    
    sameAsGuardianCheckbox.addEventListener('change', function() {
      if (this.checked) {
        guardianFields.forEach(fieldName => {
          const guardianValue = document.querySelector(`[name="${fieldName}"]`).value;
          const emergencyField = document.querySelector(`[name="emergency${fieldName.replace('guardian', '')}"]`);
          if (emergencyField) {
            emergencyField.value = guardianValue;
          }
        });
      }
    });
    
    // Handle "None" checkbox in disaster risk
    const noneCheckbox = document.querySelector('input[name="disasterRisk"][value="None"]');
    const otherDisasterCheckboxes = document.querySelectorAll('input[name="disasterRisk"]:not([value="None"])');
    
    noneCheckbox.addEventListener('change', function() {
      if (this.checked) {
        otherDisasterCheckboxes.forEach(checkbox => {
          checkbox.checked = false;
          checkbox.disabled = true;
        });
      } else {
        otherDisasterCheckboxes.forEach(checkbox => {
          checkbox.disabled = false;
        });
      }
    });
    
    // Disable other checkboxes if "None" is checked initially
    if (noneCheckbox.checked) {
      otherDisasterCheckboxes.forEach(checkbox => {
        checkbox.disabled = true;
      });
    }
    
    // Handle "None" checkbox in residential history
    const noneHistoryCheckbox = document.querySelector('input[name="resHistory"][value="None"]');
    const otherHistoryCheckboxes = document.querySelectorAll('input[name="resHistory"]:not([value="None"])');
    
    noneHistoryCheckbox.addEventListener('change', function() {
      if (this.checked) {
        otherHistoryCheckboxes.forEach(checkbox => {
          checkbox.checked = false;
          checkbox.disabled = true;
        });
      } else {
        otherHistoryCheckboxes.forEach(checkbox => {
          checkbox.disabled = false;
        });
      }
    });
    
    // Disable other checkboxes if "None" is checked initially
    if (noneHistoryCheckbox.checked) {
      otherHistoryCheckboxes.forEach(checkbox => {
        checkbox.disabled = true;
      });
    }
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Collect form data
      const formData = {
        identification: {
          name: {
            first: form.querySelector('[name="firstName"]').value,
            middle: form.querySelector('[name="middleInitial"]').value,
            last: form.querySelector('[name="lastName"]').value,
            suffix: form.querySelector('[name="nameSuffix"]').value,
            preferred: form.querySelector('[name="preferredName"]').value
          },
          assessmentType: Array.from(form.querySelectorAll('input[name="assessmentType"]:checked')).map(el => el.value),
          gender: form.querySelector('input[name="gender"]:checked')?.value || '',
          genderOther: form.querySelector('[name="genderOther"]').value,
          birthdate: {
            month: form.querySelector('[name="birthMonth"]').value,
            day: form.querySelector('[name="birthDay"]').value,
            year: form.querySelector('[name="birthYear"]').value
          },
          povertyLevel: form.querySelector('input[name="povertyLevel"]:checked')?.value || '',
          contact: {
            street: form.querySelector('[name="streetAddress"]').value,
            city: form.querySelector('[name="city"]').value,
            county: form.querySelector('[name="county"]').value,
            state: form.querySelector('[name="state"]').value,
            zip: form.querySelector('[name="zip"]').value,
            phone: form.querySelector('[name="primaryPhone"]').value,
            email: form.querySelector('[name="primaryEmail"]').value,
            altPhone: form.querySelector('[name="altPhone"]').value,
            altAddress: {
              street: form.querySelector('[name="altStreetAddress"]').value,
              city: form.querySelector('[name="altCity"]').value,
              county: form.querySelector('[name="altCounty"]').value,
              state: form.querySelector('[name="altState"]').value,
              zip: form.querySelector('[name="altZip"]').value
            }
          },
          idInfo: {
            ssn: form.querySelector('[name="ssn"]').value,
            medicare: form.querySelector('[name="medicareNumber"]').value,
            medicaid: form.querySelector('[name="medicaidNumber"]').value,
            medicaidPending: form.querySelector('[name="medicaidPending"]').checked,
            notMedicaidRecipient: form.querySelector('[name="notMedicaidRecipient"]').checked
          },
          maritalStatus: form.querySelector('input[name="maritalStatus"]:checked')?.value || '',
          guardianInfo: {
            types: Array.from(form.querySelectorAll('input[name="guardianType"]:checked')).map(el => el.value),
            otherType: form.querySelector('[name="guardianOther"]').value,
            name: form.querySelector('[name="guardianName"]').value,
            relationship: form.querySelector('[name="guardianRelationship"]').value,
            address: {
              street: form.querySelector('[name="guardianStreet"]').value,
              city: form.querySelector('[name="guardianCity"]').value,
              county: form.querySelector('[name="guardianCounty"]').value,
              state: form.querySelector('[name="guardianState"]').value,
              zip: form.querySelector('[name="guardianZip"]').value
            },
            phone: form.querySelector('[name="guardianPhone"]').value,
            email: form.querySelector('[name="guardianEmail"]').value,
            altPhone: form.querySelector('[name="guardianAltPhone"]').value
          },
          emergencyContact: {
            sameAsGuardian: form.querySelector('[name="sameAsGuardian"]').checked,
            name: form.querySelector('[name="emergencyName"]').value,
            relationship: form.querySelector('[name="emergencyRelationship"]').value,
            address: {
              street: form.querySelector('[name="emergencyStreet"]').value,
              city: form.querySelector('[name="emergencyCity"]').value,
              county: form.querySelector('[name="emergencyCounty"]').value,
              state: form.querySelector('[name="emergencyState"]').value,
              zip: form.querySelector('[name="emergencyZip"]').value
            },
            phone: form.querySelector('[name="emergencyPhone"]').value,
            email: form.querySelector('[name="emergencyEmail"]').value,
            altPhone: form.querySelector('[name="emergencyAltPhone"]').value
          },
          assessorName: form.querySelector('[name="assessorName"]').value
        },
        contactInfo: {
          dateSent: form.querySelector('[name="dateSent"]').value,
          eligibilityWorker: {
            name: form.querySelector('[name="eligibilityWorkerName"]').value,
            agency: form.querySelector('[name="eligibilityAgency"]').value,
            phone: form.querySelector('[name="eligibilityPhone"]').value,
            address: {
              street: form.querySelector('[name="eligibilityStreet"]').value,
              city: form.querySelector('[name="eligibilityCity"]').value,
              state: form.querySelector('[name="eligibilityState"]').value,
              zip: form.querySelector('[name="eligibilityZip"]').value
            },
            fax: form.querySelector('[name="eligibilityFax"]').value,
            email: form.querySelector('[name="eligibilityEmail"]').value
          },
          assessor: {
            name: form.querySelector('[name="assessorName"]').value,
            agency: form.querySelector('[name="leadAgency"]').value,
            phone: form.querySelector('[name="assessorPhone"]').value,
            address: {
              street: form.querySelector('[name="assessorStreet"]').value,
              city: form.querySelector('[name="assessorCity"]').value,
              state: form.querySelector('[name="assessorState"]').value,
              zip: form.querySelector('[name="assessorZip"]').value
            },
            fax: form.querySelector('[name="assessorFax"]').value,
            email: form.querySelector('[name="assessorEmail"]').value
          },
          additionalAssessors: form.querySelector('input[name="additionalAssessors"]:checked')?.value || '',
          personInfo: {
            firstName: form.querySelector('[name="personFirstName"]').value,
            middleInitial: form.querySelector('[name="personMI"]').value,
            lastName: form.querySelector('[name="personLastName"]').value,
            dob: form.querySelector('[name="personDOB"]').value,
            pmi: form.querySelector('[name="personPMI"]').value,
            caseNumber: form.querySelector('[name="caseNumber"]').value
          }
        },
        residentialStatus: {
          residence: form.querySelector('input[name="residence"]:checked')?.value || '',
          residenceOther: document.getElementById('residenceOther').value,
          isPermanent: form.querySelector('input[name="permanent"]:checked')?.value || '',
          permanentResidence: document.getElementById('permanentResidence').value,
          livingArrangement: form.querySelector('input[name="livingArrangement"]:checked')?.value || '',
          moved: form.querySelector('input[name="moved"]:checked')?.value || '',
          personBetterOff: form.querySelector('input[name="person_better_off"]:checked')?.value || '',
          caregiverFeels: form.querySelector('input[name="caregiver_feels"]:checked')?.value || '',
          residentialHistory: Array.from(document.querySelectorAll('input[name="resHistory"]:checked')).map(el => el.value),
          ethnicity: Array.from(document.querySelectorAll('input[name="ethnicity"]:checked')).map(el => el.value),
          race: Array.from(document.querySelectorAll('input[name="race"]:checked')).map(el => el.value),
          language: form.querySelector('input[name="language"]:checked')?.value || '',
          languageOther: document.getElementById('languageOther').value,
          interpreterUsed: form.querySelector('input[name="interpreter"]:checked')?.value || '',
          interpreterType: form.querySelector('input[name="interpreter_type"]:checked')?.value || '',
          disasterRisk: Array.from(document.querySelectorAll('input[name="disasterRisk"]:checked')).map(el => el.value),
          goalsOfCare: document.getElementById('goalsOfCare').value,
          primaryGoal: document.getElementById('primaryGoal').value
        }
      };
      
      // Here you would typically send the data to a server
      console.log('Form data:', formData);
      
      // For demo purposes, just show an alert
      alert('Form submitted successfully! Check console for data.');
      
      // You could also reset the form if desired
      // form.reset();
    });
  });