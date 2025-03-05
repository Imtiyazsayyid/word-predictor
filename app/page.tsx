"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MySelect } from "@/components/ui/MySelect";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { ArrowRight, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import predictWord from "./predictor";
import { GradientButton } from "@/components/ui/gradient-button";
import { Squares } from "@/components/ui/squares-background";

export default function SplineSceneBasic() {
  const router = useRouter();
  const [showPredict, setShowPredict] = useState(false);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("shakespeare-hamlet");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [modelOptions, setModelOptions] = useState([
    {
      label: "Shakespeare's Hamlet",
      value: "shakespeare-hamlet",
    },
    {
      label: "Shakespeare's Macbeth",
      value: "shakespeare-macbeth",
    },
    {
      label: "Shakespeare's Caesar",
      value: "shakespeare-caesar",
    },
    {
      label: "Milton's Paradise",
      value: "milton-paradise",
    },
  ]);

  async function makePrediction() {
    setLoading(true);
    const result = await predictWord(model, input);
    setText(result);
    setLoading(false);
  }

  return (
    <Card className="w-full h-screen bg-black/[0.96] relative overflow-hidden border-0">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />

      <div className="flex h-full">
        <Squares
          className="absolute h-full opacity-20 pointer-events-none"
          direction="diagonal"
          speed={0.2}
          squareSize={40}
          hoverFillColor="#0d1f2b"
          borderColor="#4d7a7a"
        />

        <div className="flex-1 p-8 relative z-10 flex flex-col items-center justify-center">
          {!showPredict ? (
            <>
              <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                Next Word Predictor
              </h1>
              <p className="mt-4 text-neutral-300 max-w-lg">A Project By Aditi Krishnan</p>
              {/* <Button className="mt-5" onClick={() => setShowPredict(true)}>
                
              </Button> */}
              <Button className="mt-10" onClick={() => setShowPredict(true)}>
                Predict <ArrowRight />
              </Button>
            </>
          ) : (
            <div className="h-fit w-fit rounded-xl bg-gray-800/30 flex flex-col z-10 overflow-hidden">
              {text && (
                <div className="h-full w-full flex justify-center py-20">
                  <TextShimmer
                    duration={1.9}
                    className="px-10 text-8xl font-bold pb-2 flex justify-center items-center dark:[--base-gradient-color:theme(colors.blue.800)] dark:[--base-color:theme(colors.gray.800)]"
                  >
                    {text}
                  </TextShimmer>
                </div>
              )}
              <div className="flex flex-col p-10 items-center gap-2 bg-black">
                <p className="text-secondary w-full text-left text-sm">Book</p>
                <MySelect
                  className="w-full min-w-96"
                  onSelect={(val) => setModel(val!)}
                  selectedItem={model}
                  options={modelOptions}
                />

                <p className="text-secondary w-full text-left text-sm mt-3">Phrase</p>
                <Input
                  className="w-full min-w-96"
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
          )}
        </div>

        {/* Right content */}
        <div className="flex-1 relative">
          <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
        </div>
      </div>
    </Card>
  );
}
