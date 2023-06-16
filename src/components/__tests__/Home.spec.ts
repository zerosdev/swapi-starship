import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '../../views/Home.vue'

describe('Home', () => {
  it('has loading placeholder', () => {
    expect(Home).toBeTruthy();
    const wrapper = mount(Home)
    expect(wrapper.html()).toContain('<contentplaceholderwrapper>')
  })
})
