"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Squares } from "@/components/ui/squares-background";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useState } from "react";
import { Loader2, Loader2Icon } from "lucide-react";
import { MySelect } from "@/components/ui/MySelect";
import predictWord from "./predictor";

export default function SplineSceneBasic() {
  const router = useRouter();
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
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col items-center justify-center">
          <div className="h-fit w-fit rounded-xl bg-black/30 flex flex-col z-10 overflow-hidden">
            {text && (
              <div className="h-full w-full flex justify-center py-20">
                <TextShimmer
                  duration={1.9}
                  className="px-10 text-8xl font-bold pb-2 flex justify-center items-center dark:[--base-gradient-color:theme(colors.blue.400)] dark:[--base-color:#4d7a7a]"
                >
                  {text}
                </TextShimmer>
              </div>
            )}
            <div className="flex flex-col p-10 items-center gap-2 bg-primary">
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
        </div>

        {/* Right content */}
        <div className="flex-1 relative">
          <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
        </div>
      </div>
    </Card>
  );
}
