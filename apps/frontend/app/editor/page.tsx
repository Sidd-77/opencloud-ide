'use client';
import React from 'react'
import XTerminal from '@/components/editor/terminal';
import OutputBox from '@/components/editor/output'
import Header from '@/components/editor/header'
import Editor from '@/components/editor/Editor';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

const page = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Header />
      <PanelGroup direction="horizontal" className="flex-1 overflow-hidden">
        <Panel minSize={20} defaultSize={60} className=' pl-2 pb-2'>
          <div className="overflow-hidden h-full pb-2 rounded-lg border-4 border-slate-800">
            <Editor />
          </div>
        </Panel>
        <PanelResizeHandle className="w-2 bg-gray-900 hover:bg-gray-600 transition-colors" />
        <Panel minSize={20}>
          <PanelGroup direction="vertical">
            <Panel minSize={30} defaultSize={50} className=' pr-2'>
              <div className="h-full ">
                <OutputBox />
              </div>
            </Panel>
            <PanelResizeHandle className="h-2 bg-gray-900 hover:bg-gray-600 transition-colors" />
            <Panel minSize={20} className=' pr-2 pb-2'>
              <div className="h-full overflow-hidden rounded-lg border-4 border-slate-800">
                <XTerminal />
              </div>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  )
}

export default page