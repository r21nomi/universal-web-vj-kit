import { MidiControllerState } from '~/types/state'
import { MidiControls } from '~/types/dto'

const NOTE_NUM = 64
const FIRST_NOTE_NUMBER = 0
const CONTROL_NUM = 9
const FIRST_CONTROL_NUMBER = 48

export const state = (): MidiControllerState => ({
  currentNoteNumber: 0,
  noteAndControls: new Map(
    [...Array(NOTE_NUM)].map((_, index) => [index, getEmptyControls()])
  ),
})

export const mutations = {
  setCurrentNoteNumber(state: MidiControllerState, num: number) {
    state.currentNoteNumber = num
  },
  setControl(
    state: MidiControllerState,
    arg: { controlNumber: number; controlValue: number }
  ) {
    const c = state.noteAndControls.get(state.currentNoteNumber)
    c?.controls.set(arg.controlNumber, arg.controlValue)
    if (c) {
      state.noteAndControls.set(state.currentNoteNumber, c)
      state.noteAndControls = new Map(state.noteAndControls)
    }
  },
}

export const actions = {
  setCurrentNoteNumber({ commit }, num: number) {
    commit('setCurrentNoteNumber', num - FIRST_NOTE_NUMBER)
  },
  setControl({ commit }, arg: { controlNumber: number; controlValue: number }) {
    commit('setControl', {
      controlNumber: arg.controlNumber - FIRST_CONTROL_NUMBER,
      controlValue: arg.controlValue,
    })
  },
}

export const getters = {
  currentMidiControls: (state: MidiControllerState) => (): MidiControls => {
    return (
      state.noteAndControls.get(state.currentNoteNumber) || getEmptyControls()
    )
  },
  midiControls:
    (state: MidiControllerState) =>
    (index: number): MidiControls => {
      return (
        state.noteAndControls.get(index + FIRST_CONTROL_NUMBER) ||
        getEmptyControls()
      )
    },
}

const getEmptyControls = (): MidiControls => {
  return {
    controls: new Map([...Array(CONTROL_NUM)].map((_, index) => [index, 0])),
  }
}
