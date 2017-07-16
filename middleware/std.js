
export default function ({ store, redirect }) {
  if (!store.state.std.nationalNumber || !process.browser) {
    redirect('/')
  }
}
