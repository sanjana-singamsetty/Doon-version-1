"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ReactFlow,
  Background,
  Node,
  Edge,
  MarkerType,
  ConnectionMode,
  useNodesState,
  useEdgesState,
  Handle,
  Position, // Added for handle positioning
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// Custom Node Component
const CustomNode = ({ data }: { data: { label: string } }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-[#F9E7A1] px-5 py-3 rounded-md shadow-md text-[#1C2C5B] font-semibold text-sm sm:text-base whitespace-nowrap border-0 cursor-default relative"
    >
      {/* Target handle (left side, for incoming edges) */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-[#BCB382] border-2 border-white"
      />

      {data.label}

      {/* Source handle (right side, for outgoing edges) */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-[#BCB382] border-2 border-white"
      />
    </motion.div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: "enquire",
    type: "custom",
    position: { x: 0, y: 0 },
    data: { label: "Enquire" },
  },
  {
    id: "assessment",
    type: "custom",
    position: { x: 0, y: 120 },
    data: { label: "Assessment" },
  },
  {
    id: "visit-campus",
    type: "custom",
    position: { x: 140, y: 60 },
    data: { label: "Visit Campus" },
  },
  {
    id: "offer",
    type: "custom",
    position: { x: 210, y: 120 },
    data: { label: "Offer" },
  },
  {
    id: "enroll",
    type: "custom",
    position: { x: 260, y: 190 },
    data: { label: "Enroll" },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "enquire",
    target: "visit-campus",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#BCB382", strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#BCB382",
      width: 20,
      height: 20,
    },
  },
  {
    id: "e2",
    source: "visit-campus",
    target: "assessment",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#BCB382", strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#BCB382",
      width: 20,
      height: 20,
    },
  },
  {
    id: "e3",
    source: "visit-campus",
    target: "offer",
    type: "default",
    animated: true,
    style: { stroke: "#BCB382", strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#BCB382",
      width: 20,
      height: 20,
    },
  },
  {
    id: "e4",
    source: "assessment",
    target: "offer",
    type: "default",
    animated: true,
    style: { stroke: "#BCB382", strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#BCB382",
      width: 20,
      height: 20,
    },
  },
  {
    id: "e5",
    source: "offer",
    target: "enroll",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#BCB382", strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#BCB382",
      width: 20,
      height: 20,
    },
  },
];

export default function ScreenThree() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <section className="relative w-full bg-[#E8F4F6] py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Yellow Block Container - Positioned at bottom like academics page */}
        <div className="flex justify-start pb-6 md:pb-8 lg:pb-10">
          <div className="bg-[#E5B93C] rounded-lg p-6 md:p-10 max-w-5xl w-full shadow-2xl">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
    {/* Left Side - Text Content */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="ttext-2xl sm:text-3xl md:text-4xl lg:text-xl font-display font-bold text-[#1C2C5B] leading-tight"
      >
        Begin Your Child's Journey Toward a Bright Future
        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-xl">
          IB & CBSE Pathways Now Open in Hyderabad
        </span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg sm:text-xl text-[#1C2C5B] leading-relaxed mt-4"
      >
        Admissions Open for Academic Year 2026–27
        <br />
        Explore CBSE and IB pathways at DIS Hyderabad.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6"
      >
        <Button className="bg-[#1C2C5B] hover:bg-[#162347] text-white px-8 py-6 text-lg font-semibold rounded-md shadow-lg transition-all duration-300">
          Apply Now
        </Button>
      </motion.div>
    </motion.div>

    {/* Right Side - Flowchart with React Flow */}
{/* Right Side - Flowchart with React Flow */}
<motion.div
  initial={{ opacity: 0, x: 30 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="relative w-full h-[450px] lg:h-[500px] -mt-10" // added -mt-8 to move it up
>
  <ReactFlow
    nodes={nodes}
    edges={edges}
    nodeTypes={nodeTypes}
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    fitView
    fitViewOptions={{ padding: 0.3, maxZoom: 1.2 }}
    nodesDraggable={false}
    nodesConnectable={false}
    elementsSelectable={false}
    panOnDrag={false}
    zoomOnScroll={false}
    zoomOnPinch={false}
    connectionMode={ConnectionMode.Loose}
    className="bg-transparent"
    style={{ background: "transparent" }}
  >
    <Background color="transparent" gap={0} />
  </ReactFlow>
</motion.div>

  </div>

          </div>
        </div>
      </div>
    </section>
  );
}
