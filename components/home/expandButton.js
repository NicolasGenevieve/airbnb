import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export function ExpandButton({
  children,
  numberOfLines = 3,
  buttonStyle,
  buttonTextStyle,
  moreLabel = "Voir plus",
  lessLabel = "Voir moins",
}) {
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);

  return (
    <View>
      <Text
        style={{ fontSize: 16, lineHeight: 30 }}
        ellipsizeMode="tail"
        numberOfLines={expanded ? undefined : numberOfLines}
        onTextLayout={(e) => {
          const lines = e?.nativeEvent?.lines?.length ?? 0;
          if (!expanded && lines >= numberOfLines && !showButton) {
            setShowButton(true);
          }
        }}
      >
        {children ?? ""}
      </Text>

      {showButton && (
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          style={[{ marginTop: 8 }, buttonStyle]}
          accessibilityRole="button"
          accessibilityLabel={
            expanded ? "Réduire le texte" : "Afficher tout le texte"
          }
        >
          <Text
            style={[{ fontWeight: "600", color: "#EB5A62" }, buttonTextStyle]}
          >
            {expanded ? lessLabel : moreLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
