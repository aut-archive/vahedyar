<template>
    <div>
        <b-alert show>
مبنی بر اتفاقات ناگهانی و مشكلات غيرقابل چشم پوشی در انتخاب واحد ترم گذشته دانشكده، تصميم گرفتيم تا با دانشكده همکاری كرده و از اتفاقات نابه‌هنگام كه به برنامه درسی دانشجويان لطمه بزند جلوگیری كنيم !
<br>
در همين راستا، با پیگیری‌های متوالی از دانشكده و زحماتی که معاون آموزشی محترم، دکتر نیک آبادی، در راستای هماهنگی‌های لازم با اساتید کشیدند، برنامه درسی ترم اول سال تحصیلی ٩٦-٩٧ را در احتيار شما قرار می‌دهیم.
لذا خواهشمند است با اين توضيحات درس‌های ترم بعد را در اولين فرصت بررسی كرده و حتما این فرم را کامل کنید تا آمار قابل استناد به دانشکده ارائه شده و ظرفیت و کلاس‌ها به اندازه کافی پیش بینی شود.
<br>
خواهشا توجه كنيد كه فرصت زمانی‌مان خیلی محدود است پس حتما هر چه زودتر نهايتا تا سه شنبه ۲۷ام ساعت ١٢ ظهر اقدام كنيد!
        </b-alert>
        <b-card header="اطلاعات دانشجو">
            <div>
                <b-form-fieldset horizontal label="شماره دانشجویی" :state="$v.stdNumber.$error ? 'warning' : ''" >
                    <b-form-input v-model="$store.state.std.stdNumber" @input="$v.stdNumber.$touch"/>
                </b-form-fieldset>

                <b-form-fieldset horizontal label="کد ملی" :state="$v.nationalNumber.$error ? 'warning' : ''" >
                    <b-form-input v-model="$store.state.std.nationalNumber" @input="$v.nationalNumber.$touch"/>
                </b-form-fieldset>

                <b-form-fieldset horizontal label="سال ورود" :state="$v.entry.$error ? 'warning' : ''">
                    <b-form-select v-model="$store.state.std.entry" :options="entries" class="mb-3"  @input="$v.entry.$touch"/>
                </b-form-fieldset>

                <b-form-fieldset horizontal label="ترم ثبت نامی" state="$v.entry.$error ? 'warning' : ''">
                    <b-form-radio v-model="$store.state.std.semester" :options="semesters" class="mb-3" @input="$v.semester.$touch"/>
                </b-form-fieldset>
            </div>
            <div class="text-left">
                <b-btn variant="success" :disabled="$v.$invalid" to="/register">گام بعدی </b-btn>
            </div>
        </b-card>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { required, minLength, maxLength, numeric } from 'vuelidate/lib/validators'

export default {
  computed: {
    ...mapState('std', ['nationalNumber', 'stdNumber', 'entry', 'semester']),
    entries: () => ['89 به قبل', '89', '90', '91', '92', '93', '94', '95'].reverse(),
    semesters: () => ['3', '5', '7', '9', '9 به بعد']
  },
  validations: {
    nationalNumber: { required, minLength: minLength(10), maxLength: maxLength(10), numeric },
    stdNumber: { required, minLength: minLength(7), maxLength: maxLength(8), numeric },
    entry: { required },
    semester: { required }
  }
}
</script>
