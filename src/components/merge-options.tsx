import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MergeOptionsProps {
  playlistIds: string[];
  onMerge: (options: { removeDuplicates: boolean }) => void;
}

export function MergeOptions({ playlistIds, onMerge }: MergeOptionsProps) {
  const [removeDuplicates, setRemoveDuplicates] = useState(true);
  const [analysis, setAnalysis] = useState<{
    totalTracks: number;
    uniqueTracks: number;
    duplicateCount: number;
    duplicateTracks: Array<{ name: string; artist: string; count: number }>;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeDuplicates = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlistIds }),
      });
      const data = await response.json();
      if (data.success) {
        setAnalysis(data.stats);
      }
    } catch (error) {
      console.error("Error analyzing duplicates:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="p-6 space-y-6 bg-card border shadow-lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Merge Options</h3>
            <p className="text-sm text-muted-foreground">
              Configure how you want to merge your playlists
            </p>
          </div>
          <Button
            onClick={analyzeDuplicates}
            disabled={isAnalyzing}
            variant="outline"
            className="bg-background"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Duplicates"}
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="remove-duplicates"
            checked={removeDuplicates}
            onCheckedChange={setRemoveDuplicates}
          />
          <Label htmlFor="remove-duplicates" className="text-sm">
            Remove duplicate tracks
          </Label>
        </div>

        {analysis && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Tracks</p>
                <p className="text-2xl font-bold">{analysis.totalTracks}</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Unique Tracks</p>
                <p className="text-2xl font-bold">{analysis.uniqueTracks}</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Duplicate Tracks</p>
                <p className="text-2xl font-bold">{analysis.duplicateCount}</p>
              </div>
            </div>

            {analysis.duplicateTracks.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Duplicate Tracks:</h4>
                <ScrollArea className="h-[200px] rounded-md border p-4">
                  <div className="space-y-2">
                    {analysis.duplicateTracks.map((track, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <div>
                          <span className="font-medium">{track.name}</span>
                          <span className="text-muted-foreground ml-2">
                            by {track.artist}
                          </span>
                        </div>
                        <span className="text-muted-foreground">
                          {track.count}x
                        </span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        )}

        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          onClick={() => onMerge({ removeDuplicates })}
        >
          Merge {playlistIds.length} Playlists
        </Button>
      </div>
    </Card>
  );
} 