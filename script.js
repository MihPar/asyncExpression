/******************************** Step #1 *************************************/

// for (let i = 1; i < 6; i++) {
//     console.log(i)
//     const div = document.createElement('span')
//     document.body.append(div)
//     // div.style.borderColor = 'blue'
//     // div.style.borderStyle = 'solid'
//     // div.style.padding = '5px 10px' 
//     // div.classList.add('box')
//     div.innerText = i
// }

/******************************** Step #2 *************************************/
// let timeoutId = 1 //??????????????????
// for (let i = 1; i < 6; i++) {
//     setTimeout(function() {
//         const div = document.createElement('span')
//         document.body.append(div)
//          div.innerText = i
//         timeoutId++
//         console.log(timeoutId)
//     }, 1000 * i)
// }

//  window.onkeydown = function(event) {
//     if (event.code === 'Space') {
//         for (let i = timeoutId; i < 6; i++) {
//             clearTimeout(i)
//         }
//     }
//     // console.log(event)
//     // console.log(event.code)
// }

/******************************** Step #3 *************************************/

// function handleTimeout(obj, resolve) {
//     const div = document.createElement('span')
//     document.body.append(div)
//     div.innerText = obj.i
//     obj.i++
//     resolve()
// }

// async function main() {
//     let timeoutId
//     let obj = {
//         i: 1
//     }
//     const upperBound = 5
//     window.onkeydown = function(event) {
//         if (event.code === 'Space') {
//             obj.i = upperBound + 1
//             clearTimeout(timeoutId)
//         }
//     }

//     while (obj.i <= upperBound) {
//         await new Promise(function(resolve) {
//             timeoutId = setTimeout(handleTimeout, 1000, obj, resolve)
//         }
//         )
//     }
// }

// main()

/******************************** Step #4 *************************************/

// function handleTimeout(obj, resolve) {
//     const div = document.createElement('span')
//     document.body.append(div)
//     div.innerText = obj.i
//     obj.i++
//     resolve()
// }
// function pause(upperBound, obj, timeoutId) {
//     clearTimeout(timeoutId)
//     obj.paused = true
// }
// function resume(resolve, obj, timeoutId) {
//     timeoutId = setTimeout(handleTimeout, 1000, obj, resolve)
//     obj.paused = false
// }

// async function main() {
//     let timeoutId
//     let obj = {
//         i: 1,
//         paused: false,
//     }
//     const upperBound = 5
//     let resolve
//     window.onkeydown = function(event) {
//         if (event.code === 'Space') {
//             if (obj.paused) {
//                 resume(resolve, obj, timeoutId)
//             } else {
//                 pause(upperBound, obj, timeoutId)
//             }
//         }
//     }

//     while (obj.i <= upperBound && !obj.paused) {
//         await new Promise(function(_resolve) {
//             timeoutId = setTimeout(handleTimeout, 1000, obj, _resolve)
//             resolve = _resolve
//         }
//         )
//     }
// }

// main()

/******************************** Step #5 *************************************/

function handleTimeout(obj, resolve) {
    const div = document.createElement('span')
    document.body.append(div)
    div.innerText = obj.i
    obj.i++
    resolve()
}
function pause(upperBound, obj) {
    clearTimeout(obj.timeoutId)
    obj.timeoutId = null
}
function resume(resolve, obj) {
    obj.timeoutId = setTimeout(handleTimeout, 500, obj, resolve)
}

async function main() {
    let obj = {
        i: 1,
        timeoutId: -1
    }
    const upperBound = 5
    let resolve
    window.onkeydown = function(event) {
        if (event.code === 'Space') {
            if (!obj.timeoutId) {
                resume(resolve, obj)
            } else {
                pause(upperBound, obj)
            }
        }
    }

    while (obj.i <= upperBound && obj.timeoutId) {
        await new Promise(function(_resolve) {
            obj.timeoutId = setTimeout(handleTimeout, 500, obj, _resolve)
            resolve = _resolve
        }
        )
    }
}

main()
