
radio.setGroup(37)
radio.setTransmitPower(3)
let avrglight: number = 0
const lightCalibrate: () => number = () => {
    let svetlo = input.lightLevel()
    let prumer: number = 0
    for (let i: number = 0; i < 10; i = i + 1) {
        prumer += svetlo
        basic.pause(20)
    }
    return prumer = prumer / 10
}
enum STATE {
    ready = 0,
    running =1,
    finish =2,
}
avrglight = lightCalibrate()

let mode: STATE = STATE.ready as STATE
let runtime: number
basic.forever(() => {
    switch (mode) {
        case STATE.ready:
            if (lightCalibrate() < avrglight - 20) {
                runtime = control.millis()
                mode = STATE.running as STATE
                radio.sendValue("state", mode)
            }
            break;
        case STATE.running:
            
            break;
        case STATE.finish:
            runtime = control.millis() - runtime
            radio.sendValue("time", runtime)
            basic.showNumber(runtime)
            if(input.buttonIsPressed(Button.A)){
                radio.sendValue("state", 0)
                mode=STATE.ready
                
            }
            break;
    }

})

radio.onReceivedValue(function (name: string, value: number) {
if(name==="state" && value===2){
    mode=STATE.finish
}
})
radio.onReceivedValue(function (name: string, value: number) {
    if (name === "state" && value === 0) {
        mode = STATE.ready
    }
})