import { Fragment, useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useAccount } from 'wagmi'

const keyboardTypes = ['60%', '75%', '80%', 'ISO 105']
const keycaps = ['ABS', 'PBT']
const filters = ['None', 'Sepia', 'Grayscale', 'Invert', 'Hue Rotate (90°)', 'Hue Rotate (180°)']

export default function Home() {
  const [ethereum, setEthereum] = useState(undefined)
  const [connectedAccount, setConnectedAccount] = useState(undefined)
  const [keyboards, setKeyboards] = useState([])
  const [newKeyboard, setNewKeyboard] = useState('')

  const { isConnected } = useAccount()

  const [keyboardType, setKeyboardType] = useState('60%')
  const [keycap, setKeycap] = useState('ABS')
  const [filter, setFilter] = useState('None')

  return (
    <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <main className="max-w-3xl mx-auto">
        <h1 className="mt-16 mb-4 text-4xl text-indigo-900">Solidity Keyboard Generator</h1>
        <ConnectButton />
        <div className="flex flex-col gap-y-8">
          <form className="flex flex-col gap-y-2">
            <div>
              <label htmlFor="keyboard-description" className="block text-sm font-medium text-gray-700">
                Keyboard Type
              </label>
            </div>
            <ListBoxSelect data={keyboardTypes} setData={setKeyboardType} />
            <div>
              <label htmlFor="keyboard-description" className="block text-sm font-medium text-gray-700">
                Keycap Type
              </label>
            </div>
            <ListBoxSelect data={keycaps} setData={setKeycap} />
            <div>
              <label htmlFor="keyboard-description" className="block text-sm font-medium text-gray-700">
                Filter
              </label>
            </div>
            <ListBoxSelect data={filters} setData={setFilter} />
            <button
              className="max-w-fit inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-80 disabled:pointer-events-none"
              type="submit"
              disabled={!isConnected}
              onClick={() => {
                console.log('creating new keyboard')
              }}>
              Create Keyboard!
            </button>
          </form>
          <p className="block text-sm font-medium text-gray-700">Preview</p>
          <Keyboard kind={keyboardType} isPBT={keycap === 'ABS' ? true : false} filter={filter} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

const Keyboard = ({ kind, isPBT, filter }) => {
  const kindDir = {
    '60%': 'sixty-percent',
    '75%': 'seventy-five-percent',
    '80%': 'eighty-percent',
    'ISO 105': 'iso-105'
  }[kind]

  const fileName = isPBT ? 'PBT' : 'ABS'

  const imagePath = `keyboards/${kindDir}/${fileName}.png`
  const alt = `${kindDir} keyboard with ${isPBT ? 'PBT' : 'ABS'} keys ${filter ? `with ${filter}` : ''}`

  return (
    <div className="rounded-lg p-2 border border-white">
      <img className={'h-[230px] w-[360px] ' + filter} src={imagePath} alt={alt} />
    </div>
  )
}

const Footer = () => {
  return (
    <footer className="mx-auto mt-48 text-center">
      {/* <a
        href='https://www.pointer.gg?utm_source=stackblitz-solidity'
        target='_blank'
        rel='noopener noreferrer'
      >
        Learn web3 dev and earn crypto rewards at{" "}
        <span className=''>Pointer</span>
      </a> */}
      <p>
        Art from Joanne Li @joanne on Figma{' '}
        <a href="https://keeybs.com" className="underline">
          keeybs.com
        </a>{' '}
        <a href="https://creativecommons.org/licenses/by/4.0/" className="underline">
          CC 4.0
        </a>
      </p>
    </footer>
  )
}

const ListBoxSelect = ({ data, setData }) => {
  const [selected, setSelected] = useState(data[0])

  return (
    <div className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
      <Listbox
        value={selected}
        onChange={(item) => {
          setSelected(item)
          setData(item)
        }}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate text-gray-900">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {data.map((item, index) => (
                <Listbox.Option
                  key={`${item + '-' + index}`}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400' : 'text-gray-900'
                    }`
                  }
                  value={item}>
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{item}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-400">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
