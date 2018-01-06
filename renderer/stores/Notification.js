import mobx, {action, observable, computed, autorun} from 'mobx'

class Notification{
  @observable message
  @observable show = false

  @action
  setMessage(msg) {
    this.message = msg
    this.show = true
  }

  @action
  setShow = () => {
    this.show = false
  }
}

export default new Notification()