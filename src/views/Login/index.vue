<template>
  <div class="common_layout">
    <div class="top">
      <div class="header">
        <img
          alt="logo"
          class="logo"
          src="/@/assets/logo.png"
        />
      </div>
      <div class="desc"></div>
    </div>
    <div class="login">
      <a-form
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-tabs
          size="large"
          :tabBarStyle="{ textAlign: 'center' }"
          style="padding: 0 2px"
        >
          <a-tab-pane style="width: 100%" tab="账户密码登录" key="1">
            <a-form-item>
              <a-input
                size="large"
                v-model:value="formState.name"
                placeholder="用户名"
              >
                <template #prefix
                  ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
                /></template>
              </a-input>
            </a-form-item>

            <a-form-item>
              <a-input
                size="large"
                v-model:value="formState.password"
                type="password"
                placeholder="密码"
              >
                <template #prefix
                  ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
                /></template>
              </a-input>
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane tab="手机号登录" key="2">
            <a-form-item style="width: 100%">
              <a-input
                size="large"
                v-model:value="formState.phone"
                placeholder="手机号"
              >
                <template #prefix
                  ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
                /></template>
              </a-input>
            </a-form-item>

            <a-form-item>
              <a-row :gutter="8" style="margin: 0 -4px">
                <a-col :span="14">
                  <a-input
                    size="large"
                    v-model:value="formState.code"
                    placeholder="验证码"
                  >
                    <template #prefix
                      ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
                    /></template>
                  </a-input>
                </a-col>
                <a-col :span="10" style="padding-left: 4px">
                  <a-button
                    :disabled="sendStart"
                    @click="senCode"
                    style="width: 100%"
                    class="captcha-button"
                    size="large"
                    >{{
                      sendStart ? `${timeOuter}秒后重新获取` : "获取验证码"
                    }}</a-button
                  >
                </a-col>
              </a-row>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <div class="forget_password">
          <a>忘记密码</a>
        </div>
        <a-form-item>
          <a-button
            :loading="logging"
            style="width: 100%; margin-top: 24px"
            size="large"
            type="primary"
            @click="onSubmit"
            >登录</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { setToken } from "/@/utils/cookies";
import { useRouter } from "vue-router";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const router = useRouter();
    let timeOuter = ref(60);
    const state = reactive({
      logging: false,
      sendStart: false,
      formState: {
        name: "",
        password: "",
        phone: "",
        code: "",
      },
      labelCol: { span: 0 },
      wrapperCol: { span: 24 },
    });

    const onSubmit = (e: { preventDefault: () => void }) => {
      e.preventDefault();
      setToken("token");
      router.push({ path: "/project" });
    };
    const senCode = () => {
      state.sendStart = true;
      const timer = setInterval(() => {
        if (timeOuter.value == 1) {
          clearInterval(timer);
          state.sendStart = false;
          timeOuter.value = 60;
        }
        timeOuter.value -= 1;
      }, 1000);
    };
    return {
      ...toRefs(state),
      timeOuter,
      onSubmit,
      senCode,
    };
  },
});
</script>

<style lang="scss" scoped>
.common_layout {
  .top {
    text-align: center;
    .header {
      height: 44px;
      line-height: 44px;
      margin-top: 60px;
      a {
        text-decoration: none;
      }
      .logo {
        height: 66px;
        vertical-align: top;
        margin-right: 16px;
      }
      .title {
        font-size: 33px;
        color: "#3480ff";
        font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica,
          sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }
    .desc {
      font-size: 14px;
      color: "#3480ff";
      margin-top: 12px;
      margin-bottom: 40px;
    }
  }
  .login {
    width: 368px;
    margin: 0 auto;
    @media screen and (max-width: 576px) {
      width: 95%;
    }
    @media screen and (max-width: 320px) {
      .captcha-button {
        font-size: 14px;
      }
    }
    .icon {
      font-size: 24px;
      color: "#3480ff";
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: "#3480ff";
      }
    }
    .forget_password {
      text-align: right;
    }
  }
}
</style>