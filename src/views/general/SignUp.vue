<template>
  <div class="mb-4 mb-lg-5">
    <div class="container d-md-flex justify-content-between align-items-center">
      <RouterLink :to="{ name: 'SignUp' }">
        <img
          v-svg-inline
          class="pt-3 pb-4"
          src="@/assets/images/age-uk-logo.svg"
          :alt="`${$appGlobals.orgName} logo`"
          :class="$style.logo"
        />
      </RouterLink>
    </div>
  </div>
  <div v-if="success" class="container mb-5 md-lg-6">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-10 col-xl-8">
        <h1 class="text-primary fw-bold mb-3 mb-lg-3">
          Thank You
        </h1>

        <p class="fs-4 mb-2 mb-lg-3">
          Your volunteering enquiry has been submitted.
        </p>

        <p>
          Thank you for reaching out to us with your volunteering enquiry. We
          will be in touch with you soon via your preferred methods of
          communication.
        </p>
      </div>
    </div>
  </div>
  <div v-else class="container mb-5 mb-lg-6">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-10 col-xl-8">
        <h1 class="text-primary fw-bold mb-3 mb-lg-3">
          {{ $language.views.signUp.title }}
        </h1>

        <Form @submit="onSubmit">
          <h2 class="text-secondary fw-bold mb-3 mb-lg-4">
            Your Details
          </h2>

          <fieldset class="row">
            <div class="col-5 col-md-2 mb-3">
              <label for="title" class="form-label">
                Title
              </label>

              <select id="title" v-model="submission.title" class="form-select">
                <option
                  v-for="(title, index) in $appGlobals.salutations"
                  :key="index"
                  :value="title.value"
                >
                  {{ title.name }}
                </option>
              </select>
            </div>

            <div class="col-12 col-md-5 mb-3">
              <TextField
                v-model="submission.forenames"
                label="First Name(s)"
                name="forenames"
                validation="required"
              />
            </div>

            <div class="col-12 col-md-5 mb-3">
              <TextField
                v-model="submission.surname"
                label="Surname"
                name="surname"
                validation="required"
              />
            </div>
          </fieldset>

          <fieldset class="row">
            <div class="col-md-6 mb-3">
              <TextField
                v-model="submission.email"
                label="Email"
                name="email"
                validation="required|email"
                help-text="We'll never share your email with anyone else."
              />
            </div>

            <div class="col flex-grow-0 flex-shrink-0 col-md-2 mb-3">
              <label for="telCountryCode" class="form-label">
                Mobile
              </label>

              <select
                id="telCountryCode"
                v-model="submission.telCountryCode"
                class="form-select"
                :class="$style.countryCode"
              >
                <option
                  v-for="(country, index) in mobileCountries"
                  :key="index"
                  :value="country"
                >
                  {{ country }}
                </option>
              </select>
            </div>

            <div class="col col-md-4 mb-3">
              <TextField
                v-model="submission.telephone"
                label="Mobile Number"
                name="telephone"
                validation="required|numeric"
                label-class="form-label invisible"
                placeholder="Mobile number"
              />
            </div>
          </fieldset>

          <fieldset class="row">
            <legend class="col-form-label pt-0 pb-1">
              Date of Birth
            </legend>

            <div class="col-4 col-md-2 mb-3">
              <TextField
                v-model="dob.dd"
                label="Day"
                name="dd"
                validation="required|numeric"
                placeholder="DD"
                maxlength="2"
              />
            </div>

            <div class="col-4 col-md-2 mb-3">
              <TextField
                v-model="dob.mm"
                label="Month"
                name="mm"
                validation="required|numeric"
                placeholder="MM"
                maxlength="2"
              />
            </div>

            <div class="col-4 col-md-2 mb-3">
              <TextField
                v-model="dob.yyyy"
                label="Year"
                name="yyyy"
                validation="required|numeric"
                placeholder="YYYY"
                maxlength="4"
              />
            </div>
          </fieldset>

          <h2 class="text-secondary fw-bold mt-3 mb-3 mb-lg-4">
            Your Address
          </h2>

          <fieldset class="row">
            <div class="col-12 col-md-6 mb-3">
              <TextField
                v-model="submission.addressLine1"
                label="Address Line 1"
                name="addressLine1"
                validation="required"
              />
            </div>

            <div class="col-12 col-md-6 mb-3">
              <TextField
                v-model="submission.addressLine2"
                label="Address Line 2"
                name="addressLine2"
              />
            </div>

            <div class="col-12 col-md-6 mb-3">
              <TextField
                v-model="submission.town"
                label="Town"
                name="town"
                validation="required"
              />
            </div>

            <div class="col-12 col-md-6 mb-3">
              <TextField
                v-model="submission.county"
                label="County"
                name="county"
                validation="required"
              />
            </div>

            <div class="col-12 col-md-3 mb-3">
              <TextField
                v-model="submission.postcode"
                label="Postcode"
                name="postcode"
                validation="required"
                maxlength="8"
              />
            </div>
          </fieldset>

          <h2 class="text-secondary fw-bold mt-3 mb-2 mb-lg-3">
            Your Interests
          </h2>

          <fieldset class="row mb-4">
            <p class="col-12 fs-4 mb-3 mb-lg-4">
              Tell us which divisions of {{ $appGlobals.orgName }} you would be
              interested in volunteering for.
            </p>

            <div
              v-for="(division, index) in $appGlobals.divisions"
              :key="index"
              class="col-12 col-md-6 mb-2"
            >
              <div class="form-check">
                <input
                  :id="`checkbox-option-${index}`"
                  v-model="submission.divisions"
                  class="form-check-input"
                  type="checkbox"
                  :value="division.id"
                />
                <label
                  class="form-check-label"
                  :for="`checkbox-option-${index}`"
                >
                  {{ division.name }}
                </label>
              </div>
            </div>
          </fieldset>

          <h2 class="text-secondary fw-bold mt-3 mb-2 mb-lg-3">
            Keep in touch with {{ $appGlobals.orgName }}
          </h2>

          <div class="row mb-4">
            <p class="col-12 fs-4 mb-3 mb-lg-4">
              We'd like to keep in touch with you about the vital work we do for
              older people, our fundraising appeals and opportunities to support
              us, as well as the products and services you can buy.
            </p>

            <p>
              We will never sell your data and we promise to keep your details
              safe and secure.
            </p>

            <fieldset class="col-12 mb-3">
              <legend class="mb-4 fs-6 fw-bold">
                Please tick the boxes below to tell us all the ways you would
                prefer to hear from us:
              </legend>

              <div class="form-check form-check-lg mb-3">
                <input
                  id="checkbox-option-email"
                  v-model="submission.commsEmailEnabled"
                  class="form-check-input"
                  type="checkbox"
                />
                <label class="form-check-label" for="checkbox-option-email">
                  Yes, I would like to receive communications by email
                </label>
              </div>

              <div class="form-check form-check-lg mb-3">
                <input
                  id="checkbox-option-post"
                  v-model="commsPostOptOut"
                  class="form-check-input"
                  type="checkbox"
                />
                <label class="form-check-label" for="checkbox-option-post">
                  No, I <strong>do not</strong> wish to receive communications
                  by post
                </label>
              </div>

              <div class="form-check form-check-lg mb-3">
                <input
                  id="checkbox-option-phone"
                  v-model="submission.commsPhoneEnabled"
                  class="form-check-input"
                  type="checkbox"
                />
                <label class="form-check-label" for="checkbox-option-phone">
                  Yes, I would like to receive communications by phone
                </label>
              </div>

              <div class="form-check form-check-lg">
                <input
                  id="checkbox-option-sms"
                  v-model="submission.commsSMSEnabled"
                  class="form-check-input"
                  type="checkbox"
                />
                <label class="form-check-label" for="checkbox-option-sms">
                  Yes, I would like to receive communications by SMS (text
                  message)
                </label>
              </div>
            </fieldset>
          </div>

          <button
            v-if="submitting"
            type="submit"
            class="btn btn-lg btn-primary"
            aria-live="polite"
            disabled
          >
            {{ $language.general.form.submitting }}...
          </button>
          <button v-else type="submit" class="btn btn-lg btn-primary">
            {{ $language.general.form.submit }}
          </button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form } from 'vee-validate';
import TextField from '@/components/form/TextField';

export default {
  components: {
    Form,
    TextField,
  },
  data() {
    return {
      success: false,
      submitting: false,
      mobileCountries: ['+44', '+1'],
      dob: {
        dd: '',
        mm: '',
        yyyy: '',
      },
      commsPostOptOut: false,
      submission: {
        title: 'Mr',
        forenames: '',
        surname: '',
        telCountryCode: '+44',
        telephone: '',
        email: '',
        addressLine1: '',
        addressLine2: '',
        town: '',
        county: '',
        postcode: '',
        country: 'United Kingdom',
        dateOfBirth: '',
        divisions: [],
        commsSMSEnabled: false,
        commsPostEnabled: true,
        commsEmailEnabled: false,
        commsPhoneEnabled: false,
      },
    };
  },
  watch: {
    dob: {
      handler: function(val) {
        this.submission.dateOfBirth = `${val.yyyy}-${val.mm}-${val.dd}`;
      },
      deep: true,
    },
    commsPostOptOut: {
      handler: function(val) {
        this.submission.commsPostEnabled = !val;
      },
    },
  },
  methods: {
    async onSubmit() {
      this.$store.dispatch('alert/hideAlert');

      this.submitting = true;

      const payload = {
        ...this.submission,
      };

      try {
        const response = await this.$services.volunteers.register(payload);

        if (response.success) {
          this.success = true;
        } else {
          throw new Error(
            response.validationErrors[0]
              ? response.validationErrors[0]
              : 'Oops - something went wrong.',
          );
        }
      } catch (e) {
        this.$store.dispatch('alert/showAlert', {
          type: 'alert-danger',
          text: e.message,
        });
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>

<style lang="scss" module>
.logo {
  max-width: 190px;
  height: auto;
}

.countryCode {
  @include media-breakpoint-down(md) {
    min-width: 110px;
  }
}
</style>
