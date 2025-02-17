
radio.setTransmitPower(5)
radio.setGroup(37)

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
    running = 1,
    finish = 2,
}
input.onButtonPressed(Button.A, function () {
    radio.sendValue("state", 0)
    avrglight = lightCalibrate()
    mode = STATE.ready
    music.playTone(100, 200)
})


input.onButtonPressed(Button.B, function () {
    avrglight = lightCalibrate()
})
let mode: STATE = STATE.ready as STATE
let runtime: number
basic.forever(() => {
    switch (mode) {
        case STATE.ready:

            if (input.lightLevel()+50<avrglight) {
                music.playTone(300, 200)
                runtime = control.millis()
                radio.sendValue("state", 1)
                mode = STATE.running as STATE

            }
            break;
        case STATE.running:

            break;
        case STATE.finish:
            runtime = control.millis() - runtime
            radio.sendValue("time", runtime)
            basic.showNumber(runtime/1000)

            break;
    }

})

radio.onReceivedValue(function (name: string, value: number) {
    if (name === "state" && value === 0) {
        mode = STATE.ready
    }
    if (name === "state" && value === 2) {
        mode = STATE.finish
    }
})