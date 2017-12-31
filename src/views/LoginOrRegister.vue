<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card
              no-body
              class="p-4">
              <b-card-body>
                <h1 v-if="type === 'login'">Login</h1>
                <h1 v-if="type === 'register'">Create account</h1>
                <p class="text-muted">
                  <span v-if="type === 'login'">Sign In to your account</span>
                </p>
                <b-alert
                  show
                  variant="danger"
                  v-if="triedSubmit && error !== ''">{{ error }}
                </b-alert>
                <b-form
                  @submit="onSubmit"
                  ref="form"
                  v-if="show">
                  <div class="input-group mb-3">
                    <span class="input-group-addon"><i class="icon-user"/></span>
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      v-model="form.email"
                      required
                      placeholder="Email">
                  </div>
                  <div class="input-group mb-4">
                    <span class="input-group-addon"><i class="icon-lock"/></span>
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      v-model="form.password"
                      required
                      @change="doPasswordsMatch"
                      placeholder="Password">
                  </div>
                  <div
                    class="input-group mb-4"
                    v-if="type === 'register'">
                    <span class="input-group-addon"><i class="icon-lock"/></span>
                    <input
                      type="password"
                      class="form-control"
                      name="password2"
                      v-model="form.password2"
                      required
                      ref="passwordConfirm"
                      @input="doPasswordsMatch"
                      placeholder="Password again">
                  </div>
                  <b-alert
                    show
                    variant="danger"
                    v-if="triedSubmit && passwordError !== ''">{{ passwordError }}
                  </b-alert>
                  <b-row>
                    <b-col cols="6">
                      <b-button
                        variant="link"
                        class="px-0"
                        v-if="type === 'login'">Forgot password?
                      </b-button>
                    </b-col>
                    <b-col
                      cols="6"
                      class="text-right">
                      <b-button
                        variant="primary"
                        class="px-4"
                        type="submit"
                        v-if="type === 'login'"
                      >Login
                      </b-button>
                      <b-button
                        variant="success"
                        class="px-4"
                        type="submit"
                        v-if="type === 'register'"
                        ref="submitRegistration"
                      >Register
                      </b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card
              no-body
              class="text-white bg-primary py-5 d-md-down-none"
              style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2 v-if="type === 'login'">Not a user?</h2>
                  <h2 v-if="type === 'register'">Already a user?</h2>
                  <b-button
                    variant="primary"
                    class="active mt-3"
                    @click="toggleType"
                  >
                    <span v-if="type === 'login'">Register new account</span>
                    <span v-if="type === 'register'">Sign in</span>
                  </b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import auth from '../auth';

export default {
  name: 'Login',
  data: () => {
    return {
      type: 'login',
      triedSubmit: false,
      show: true,
      form: {
        email: '',
        password: '',
        password2: ''
      },
      passwordError: '',
      error: ''
    };
  },
  methods: {
    toggleType() {
      this.type = this.type === 'login' ? 'register' : 'login';
      this.triedSubmit = false;
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.triedSubmit = true;

      if (!this.doPasswordsMatch()) {
        return;
      }

      auth.loginOrRegister(this.type, this, this.form, '/portfolio');
    },
    doPasswordsMatch() {
      if (!this.triedSubmit || this.type !== 'register') {
        return true;
      }

      const _newMessage =
        this.form.password === this.form.password2 ? '' : 'Passwords do not match';

      if (this.passwordError !== _newMessage) {
        this.passwordError = _newMessage;

        return false;
      }

      return true;
    }
  }
};
</script>
