"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Squares } from "@/components/ui/squares-background";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useState } from "react";
import predictWord from "./predictor";
import { Loader2, Loader2Icon } from "lucide-react";
import { MySelect } from "@/components/ui/MySelect";

export default function Home() {
  const [input, setInput] = useState("");
  const [model, setModel] = useState("shakespeare-hamlet.h5");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [modelOptions, setModelOptions] = useState([
    {
      label: "Shakespeare's Hamlet",
      value: "shakespeare-hamlet.h5",
    },
    {
      label: "Shakespeare's Macbeth",
      value: "shakespeare-macbeth.h5",
    },
    {
      label: "Shakespeare's Caesar",
      value: "shakespeare-caesar.h5",
    },
    {
      label: "Milton's Paradise",
      value: "milton-paradise.h5",
    },
  ]);

  async function makePrediction() {
    setLoading(true);
    const result = await predictWord(model, input);
    setText(result);
    setLoading(false);
  }

  return (
    <div>
      <Squares
        className="absolute h-full opacity-20 pointer-events-none"
        direction="diagonal"
        speed={0.2}
        squareSize={40}
        hoverFillColor="#0d1f2b"
        borderColor="#4d7a7a"
      />
      <div className="flex justify-center items-center h-screen z-10">
        <div className="h-fit w-fit rounded-xl bg-black/30 flex flex-col z-10 overflow-hidden">
          {text && (
            <div className="h-full w-full flex justify-center py-20">
              <TextShimmer
                duration={1.9}
                className="text-8xl font-bold pb-2 flex justify-center items-center dark:[--base-gradient-color:theme(colors.blue.400)] dark:[--base-color:#4d7a7a]"
              >
                {text}
              </TextShimmer>
            </div>
          )}
          <div className="flex flex-col p-10 items-center gap-2 bg-primary">
            <p className="text-secondary w-full text-left text-sm">Book</p>
            <MySelect className="w-96" onSelect={(val) => setModel(val!)} selectedItem={model} options={modelOptions} />

            <p className="text-secondary w-full text-left text-sm mt-3">Phrase</p>
            <Input
              className="w-96"
              placeholder="Type a phrase..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button variant={"outline"} className="mt-8 w-40" onClick={makePrediction} disabled={loading}>
              {loading ? "Predicting" : "Predict"}
              {loading && <Loader2Icon className="animate-spin h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
