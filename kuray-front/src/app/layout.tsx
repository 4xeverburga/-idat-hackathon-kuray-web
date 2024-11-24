"use client";
import 'leaflet/dist/leaflet.css';
import React from 'react';
import './globals.css'; // Asegúrate de que este archivo exista o cámbialo al que estés usando.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}