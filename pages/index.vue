<template>
    <div>
        <b-alert show>
مبنی بر اتفاقات ناگهانی و مشكلات غيرقابل چشم پوشی در انتخاب واحد ترم گذشته دانشكده، تصميم گرفتيم تا با دانشكده همکاری كرده و از اتفاقات نابه‌هنگام كه به برنامه درسی دانشجويان لطمه بزند جلوگیری كنيم !
<br>
در همين راستا، با پیگیری‌های متوالی از دانشكده و زحماتی که معاون آموزشی محترم، دکتر نیک آبادی، در راستای هماهنگی‌های لازم با اساتید کشیدند، برنامه تقریبی درسی ترم اول سال تحصیلی ٩٦-٩٧ را از طریق شورای دانشکده در احتيار شما قرار می‌دهیم.
لذا خواهشمند است با اين توضيحات درس‌های ترم بعد را در اولين فرصت بررسی كرده و حتما این فرم را کامل کنید تا آمار قابل استناد به دانشکده ارائه شده و ظرفیت و کلاس‌ها به اندازه کافی پیش بینی شود.
<br>
خواهشا توجه كنيد كه فرصت زمانی‌مان خیلی محدود است پس حتما هر چه زودتر نهايتا تا سه شنبه ۲۷ام ساعت ١٢ ظهر اقدام كنيد!
        </b-alert>
        <b-card header="اطلاعات دانشجو">
            <form @submit.prevent="submit">
                <div class="row">
                    <b-form-fieldset horizontal label="شماره دانشجویی" :state="v($v.stdNumber)" class="col-md-6">
                        <b-form-input v-model="$store.state.std.stdNumber" @input="$v.stdNumber.$touch" :formatter="number" inputmode="numeric"/>
                    </b-form-fieldset>

                    <b-form-fieldset horizontal label="کد ملی" :state="v($v.nationalNumber)" class="col-md-6"
                        description="از کد ملی برای هویت سنجی دانشجو استفاده می شود."
                    >
                        <b-form-input v-model="$store.state.std.nationalNumber" @input="$v.nationalNumber.$touch" :formatter="number" inputmode="numeric"/>
                    </b-form-fieldset>
                </div>

                <div class="row">
                    <b-form-fieldset horizontal label="سال ورود" :state="v($v.entry)" class="col-md-6">
                        <b-form-select v-model="$store.state.std.entry" :options="entries" class="mb-3"  @input="$v.entry.$touch"/>
                    </b-form-fieldset>
                    <b-form-fieldset horizontal label="ترم ثبت نامی" :state="v($v.entry)" class="col-md-6">
                        <b-form-select v-model="$store.state.std.semester" :options="semesters" class="mb-3" @input="$v.semester.$touch"/>
                    </b-form-fieldset>
                </div>

                <div class="text-left">
                    <b-btn variant="success" :disabled="$v.$invalid" type="submit" tabindex="3">گام بعدی </b-btn>
                </div>
            </form>
        </b-card>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { required, minLength, maxLength, numeric } from 'vuelidate/lib/validators'
import { codemeli, stdNumber } from '~/plugins/vuelidate'
import { transoformPersian } from '~/plugins/persian'

export default {
  computed: {
    ...mapState('std', ['nationalNumber', 'stdNumber', 'entry', 'semester']),
    entries: () => [ '95', '94', '93', '92', '91', '90', '89', '89 به قبل' ],
    semesters: () => ['1', '2', '3', '4', '5', '6', '7', '8', '8 به بعد']
  },
  validations: {
    nationalNumber: { required, codemeli },
    stdNumber: { required, stdNumber, minLength: minLength(7), maxLength: maxLength(8), numeric },
    entry: { required },
    semester: { required }
  },
  methods: {
    v ($v) {
      if ($v.$error) return 'warning'
      if (!$v.$invalid) return 'success'
    },
    submit () {
      if (!this.$v.$invalid) {
        this.$router.push('/register')
      }
    },
    number: transoformPersian
  },
  watch: {
    stdNumber (val) {
      let e = String(val).substr(0, 2)
      if (this.entries.indexOf(e) === -1) {
        e = this.entries[this.entries.length - 1]
      }
      this.$store.state.std.entry = e

      let s = ((96 - e) * 2 + 1) + ''
      if (this.semesters.indexOf(s) !== -1) {
        this.$store.state.std.semester = s
      } else {
        this.$store.state.std.semester = this.semesters[this.semesters.length - 1]
      }
    }
  }
}
</script>
