import store from '/@/store/index';
import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import { UserInfo } from '/@/utils/types';
import { getUserInfo } from '/@/api/user.ts';

@Module({ namespaced: true, name: 'User', dynamic: true, store })

class User extends VuexModule {
  private userInfoState: UserInfo | null = null;
  private tokenState = '';

  get getUserInfoState(): UserInfo {
    return this.userInfoState || {userId: '', userName: '', realName: ''}
  }

  get getTokenState(): string {
    return this.tokenState
  }

  @Mutation
  commitResetState(): void {
    this.userInfoState = null;
    this.tokenState = '';
  }

  @Mutation
  commitTokenState(token: string): void {
    this.tokenState = token;
  }
  
  @Mutation
  commitUserInfoState(info: UserInfo): void {
    this.userInfoState = info;
  }

  @Action
  async getUserInfoAction({ userId }: {userId: string | number}) {
    const userInfo = await getUserInfo({ userId });
    this.commitUserInfoState(userInfo);
    return userInfo;
  }
}

export const userStore = getModule<User>(User);