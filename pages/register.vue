<template>
    <div v-if="loading" class="text-center">
          <img width="100px" src='~assets/ripple.svg'/>
    </div>
    <div v-else>
        <b-card no-block class="mt-3 mb-3">
            <b-table striped hover :items="courses" :fields="fields">
                <template slot="status" scope="{item}">
                    <b-form-select :options="options" v-model="item.state" />
                </template>
            </b-table>
        </b-card>

        <div class="mt-3 mb-3 text-center">
            <b-form-checkbox v-model="confirmed">
              اینجانب به شماره دانشجویی
              <strong>{{ $store.state.std.stdNumber }}</strong>
              از صحت اطلاعات فرم بالا اطمینان دارم.
            </b-form-checkbox>
            <br>
            <b-btn variant="primary" :disabled="!confirmed" @click="submit">ثبت و ارسال</b-btn>
        </div>
    </div>
</template>

<script>

export default {
  middleware: [ 'std' ],
  data () {
    return {
      confirmed: null,
      loading: false
    }
  },
  async asyncData ({ app: { $axios }, store, redirect }) {
    let courses = (await $axios.get('courses')).data
    courses.forEach(c => {
      c.state = null
    })

    return {
      origCourses: courses
    }
  },
  computed: {
    options () {
      return {
        '': 'بر نمیدارم',
        'r': 'طبق چارت درسی باید بردارم',
        'o': 'درس اختیاری برمیدارم'
      }
    },
    fields () {
      return {
        course: { label: 'نام درس' },
        semester: { label: 'ترم' },
        entry: { label: 'مختص ورودی' },
        status: { label: 'وضعیت من' }
      }
    },
    courses () {
      return this.origCourses.sort((a, b) => {
        const d1 = Math.abs(a.semester - this.semester) + Math.abs(a.entry - this.entry)
        const d2 = Math.abs(b.semester - this.semester) + Math.abs(b.entry - this.entry)
        if (d1 === d2) return 0
        return d1 < d2 ? -1 : +1
      })
    }
  },
  methods: {
    async submit () {
      const form = Object.assign({courses: {}}, this.$store.state.std)

      this.origCourses.forEach(c => {
        form.courses[c.course] = { state: c.state }
      })

      this.loading = true
      await this.$post('submit', form)
      this.loading = false

      this.$router.push('/thanks')
    }
  }
}
</script>
