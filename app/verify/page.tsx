"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import {
  Upload,
  FileText,
  ImageIcon,
  Download,
  Check,
  X,
  Search,
  QrCode,
  Eye,
  EyeOff,
  Globe,
  Zap,
  Rocket,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Certificate data
const certData = {
  "DLG/HO25/PART/001": {
    "name": "Manoj Narvekar ",
    "team": "SmartCrop Crew ",
    "verified": true,
    "refNo": "KR-2025-001",
    "type": "Participation"
  },
  "DLG/HO25/PART/002": {
    "name": "Kumar Daksh",
    "team": "Snackers",
    "verified": true,
    "refNo": "KR-2025-002",
    "type": "Participation"
  },
  "DLG/HO25/PART/003": {
    "name": "Laxita Jain ",
    "team": "X^2",
    "verified": true,
    "refNo": "KR-2025-003",
    "type": "Participation"
  },
  "DLG/HO25/PART/004": {
    "name": "Krish",
    "team": "Titans",
    "verified": true,
    "refNo": "KR-2025-004",
    "type": "Participation"
  },
  "DLG/HO25/PART/005": {
    "name": "Ayush Rajput",
    "team": "CodeOrbiters",
    "verified": true,
    "refNo": "KR-2025-005",
    "type": "Participation"
  },
  "DLG/HO25/PART/006": {
    "name": "Priyansh Narang",
    "team": "The Git Reapers",
    "verified": true,
    "refNo": "KR-2025-006",
    "type": "Participation"
  },
  "DLG/HO25/PART/007": {
    "name": "Aditya Santosh Deshmukh ",
    "team": " ErrorVerse ",
    "verified": true,
    "refNo": "KR-2025-007",
    "type": "Participation"
  },
  "DLG/HO25/PART/008": {
    "name": "Kushagra Agrawal ",
    "team": "VisionX ",
    "verified": true,
    "refNo": "KR-2025-008",
    "type": "Participation"
  },
  "DLG/HO25/PART/009": {
    "name": "Kesar Prasad Parab ",
    "team": "Codify ",
    "verified": true,
    "refNo": "KR-2025-009",
    "type": "Participation"
  },
  "DLG/HO25/PART/010": {
    "name": "Hariom Tiwari",
    "team": "NextBit",
    "verified": true,
    "refNo": "KR-2025-010",
    "type": "Participation"
  },
  "DLG/HO25/PART/011": {
    "name": "Vishakha Kumari",
    "team": "     TrackTroop",
    "verified": true,
    "refNo": "KR-2025-011",
    "type": "Participation"
  },
  "DLG/HO25/PART/012": {
    "name": "Sayali Popat Sathe ",
    "team": "Innovative sparks ",
    "verified": true,
    "refNo": "KR-2025-012",
    "type": "Participation"
  },
  "DLG/HO25/PART/013": {
    "name": "SATHWIK RAMINEDI",
    "team": "CODESTROM",
    "verified": true,
    "refNo": "KR-2025-013",
    "type": "Participation"
  },
  "DLG/HO25/PART/014": {
    "name": "Mahadev Balla",
    "team": "InnovateX",
    "verified": true,
    "refNo": "KR-2025-014",
    "type": "Participation"
  },
  "DLG/HO25/PART/015": {
    "name": "Borigi Jyothiradhithya",
    "team": "Team Adhi",
    "verified": true,
    "refNo": "KR-2025-015",
    "type": "Participation"
  },
  "DLG/HO25/PART/016": {
    "name": "ANURAG SHARMA",
    "team": "CORBETT",
    "verified": true,
    "refNo": "KR-2025-016",
    "type": "Participation"
  },
  "DLG/HO25/PART/017": {
    "name": "VIDYA JAGGI",
    "team": "HackDuo",
    "verified": true,
    "refNo": "KR-2025-017",
    "type": "Participation"
  },
  "DLG/HO25/PART/018": {
    "name": "Yash Pradip Pakale",
    "team": "Runtime Terror",
    "verified": true,
    "refNo": "KR-2025-018",
    "type": "Participation"
  },
  "DLG/HO25/PART/019": {
    "name": "Pravash Singh ",
    "team": "AGRI TECH INNOVATORS",
    "verified": true,
    "refNo": "KR-2025-019",
    "type": "Participation"
  },
  "DLG/HO25/PART/020": {
    "name": "Archana ",
    "team": "Mind bridge ",
    "verified": true,
    "refNo": "KR-2025-020",
    "type": "Participation"
  },
  "DLG/HO25/PART/021": {
    "name": "Sania",
    "team": "Linksters",
    "verified": true,
    "refNo": "KR-2025-021",
    "type": "Participation"
  },
  "DLG/HO25/PART/022": {
    "name": "Tanmay Mahesh Warkhede ",
    "team": "Code Spark ",
    "verified": true,
    "refNo": "KR-2025-022",
    "type": "Participation"
  },
  "DLG/HO25/PART/023": {
    "name": "Dhavalkumar Bodar",
    "team": "Code Craft",
    "verified": true,
    "refNo": "KR-2025-023",
    "type": "Participation"
  },
  "DLG/HO25/PART/024": {
    "name": "Sakshi Dombale",
    "team": "Aurora Health",
    "verified": true,
    "refNo": "KR-2025-024",
    "type": "Participation"
  },
  "DLG/HO25/PART/025": {
    "name": "Priyanshi Gupta ",
    "team": "AI Avengers ",
    "verified": true,
    "refNo": "KR-2025-025",
    "type": "Participation"
  },
  "DLG/HO25/PART/026": {
    "name": "Prashant Dhangar ",
    "team": "San",
    "verified": true,
    "refNo": "KR-2025-026",
    "type": "Participation"
  },
  "DLG/HO25/PART/027": {
    "name": "Sanskar Katiyar",
    "team": "HPjunios",
    "verified": true,
    "refNo": "KR-2025-027",
    "type": "Participation"
  },
  "DLG/HO25/PART/028": {
    "name": "Sarvesh Sapkal ",
    "team": "We bare bugs",
    "verified": true,
    "refNo": "KR-2025-028",
    "type": "Participation"
  },
  "DLG/HO25/PART/029": {
    "name": "Satyam Gupta",
    "team": "TechBrix",
    "verified": true,
    "refNo": "KR-2025-029",
    "type": "Participation"
  },
  "DLG/HO25/PART/030": {
    "name": "Devraj Samadhan Shinde ",
    "team": "SRM's Innovators ",
    "verified": true,
    "refNo": "KR-2025-030",
    "type": "Participation"
  },
  "DLG/HO25/PART/031": {
    "name": "PRATHAM KISHOR",
    "team": "CODE CRAFTERS",
    "verified": true,
    "refNo": "KR-2025-031",
    "type": "Participation"
  },
  "DLG/HO25/PART/032": {
    "name": "Shourya Gupta",
    "team": "SoloStack",
    "verified": true,
    "refNo": "KR-2025-032",
    "type": "Participation"
  },
  "DLG/HO25/PART/033": {
    "name": "Shreya Goyal ",
    "team": "Calm Coders ",
    "verified": true,
    "refNo": "KR-2025-033",
    "type": "Participation"
  },
  "DLG/HO25/PART/034": {
    "name": "Abhiram Royals",
    "team": "Team Aira",
    "verified": true,
    "refNo": "KR-2025-034",
    "type": "Participation"
  },
  "DLG/HO25/PART/035": {
    "name": "Dheeraj Khetwal",
    "team": "Code Conqueror",
    "verified": true,
    "refNo": "KR-2025-035",
    "type": "Participation"
  },
  "DLG/HO25/PART/036": {
    "name": "Tanush Gupta ",
    "team": "CodeZen",
    "verified": true,
    "refNo": "KR-2025-036",
    "type": "Participation"
  },
  "DLG/HO25/PART/037": {
    "name": "Kishan Kumar ",
    "team": "Operators ",
    "verified": true,
    "refNo": "KR-2025-037",
    "type": "Participation"
  },
  "DLG/HO25/PART/038": {
    "name": "M Gokulan ",
    "team": "Deep Dreamers ",
    "verified": true,
    "refNo": "KR-2025-038",
    "type": "Participation"
  },
  "DLG/HO25/PART/039": {
    "name": "Lalitha Varma ",
    "team": "NextGenCrafters",
    "verified": true,
    "refNo": "KR-2025-039",
    "type": "Participation"
  },
  "DLG/HO25/PART/040": {
    "name": "Aadiraj Singh Chauhan",
    "team": "404Ninjas",
    "verified": true,
    "refNo": "KR-2025-040",
    "type": "Participation"
  },
  "DLG/HO25/PART/041": {
    "name": "Rathod Rupali",
    "team": "WE",
    "verified": true,
    "refNo": "KR-2025-041",
    "type": "Participation"
  },
  "DLG/HO25/PART/042": {
    "name": "Bharath Krishnan S",
    "team": "Tech devils",
    "verified": true,
    "refNo": "KR-2025-042",
    "type": "Participation"
  },
  "DLG/HO25/PART/044": {
    "name": "Saranya Sri Ravi",
    "team": "SheCares",
    "verified": true,
    "refNo": "KR-2025-043",
    "type": "Participation"
  },
  "DLG/HO25/PART/045": {
    "name": "Rajmukund mehta ",
    "team": "Binary brains ",
    "verified": true,
    "refNo": "KR-2025-044",
    "type": "Participation"
  },
  "DLG/HO25/PART/046": {
    "name": "Aniket wanave ",
    "team": "Dev-pirates",
    "verified": true,
    "refNo": "KR-2025-045",
    "type": "Participation"
  },
  "DLG/HO25/PART/047": {
    "name": "Darshan Choudhary ",
    "team": "VOICEWEAVERS ",
    "verified": true,
    "refNo": "KR-2025-046",
    "type": "Participation"
  },
  "DLG/HO25/PART/048": {
    "name": "Shreyas Salunkhe",
    "team": "Declutters",
    "verified": true,
    "refNo": "KR-2025-047",
    "type": "Participation"
  },
  "DLG/HO25/PART/049": {
    "name": "Sai Venkata Midhilesh Teki",
    "team": "Tech Marvels",
    "verified": true,
    "refNo": "KR-2025-048",
    "type": "Participation"
  },
  "DLG/HO25/PART/050": {
    "name": "Diya Khatri",
    "team": "Recruitech",
    "verified": true,
    "refNo": "KR-2025-049",
    "type": "Participation"
  },
  "DLG/HO25/PART/051": {
    "name": "Cheerala Bhargav",
    "team": "Team Nexus",
    "verified": true,
    "refNo": "KR-2025-050",
    "type": "Participation"
  },
  "DLG/HO25/PART/052": {
    "name": "Kritika Ruhela",
    "team": "R777",
    "verified": true,
    "refNo": "KR-2025-051",
    "type": "Participation"
  },
  "DLG/HO25/PART/053": {
    "name": "PRAVAN GUPTA ",
    "team": "Prime Innovators ",
    "verified": true,
    "refNo": "KR-2025-052",
    "type": "Participation"
  },
  "DLG/HO25/PART/054": {
    "name": "Srisant Panigrahi",
    "team": "Quanter",
    "verified": true,
    "refNo": "KR-2025-053",
    "type": "Participation"
  },
  "DLG/HO25/PART/055": {
    "name": "Utkarsh Upadhyay",
    "team": "SyncSparks",
    "verified": true,
    "refNo": "KR-2025-054",
    "type": "Participation"
  },
  "DLG/HO25/PART/057": {
    "name": "Vedika Chaudhari",
    "team": "Tech Titans ",
    "verified": true,
    "refNo": "KR-2025-055",
    "type": "Participation"
  },
  "DLG/HO25/PART/058": {
    "name": "Patel Vinay Chetankumar ",
    "team": "AI Master",
    "verified": true,
    "refNo": "KR-2025-056",
    "type": "Participation"
  },
  "DLG/HO25/PART/059": {
    "name": "Kunal Chaudhari",
    "team": "BIT-DEFENDERS",
    "verified": true,
    "refNo": "KR-2025-057",
    "type": "Participation"
  },
  "DLG/HO25/PART/060": {
    "name": "Nainish Jaiswal",
    "team": "NeuroCred",
    "verified": true,
    "refNo": "KR-2025-058",
    "type": "Participation"
  },
  "DLG/HO25/PART/061": {
    "name": "Vansh Gupta",
    "team": "Regresso",
    "verified": true,
    "refNo": "KR-2025-059",
    "type": "Participation"
  },
  "DLG/HO25/PART/062": {
    "name": "Prathviraj Singh Chauhan",
    "team": "JanRakshak",
    "verified": true,
    "refNo": "KR-2025-060",
    "type": "Participation"
  },
  "DLG/HO25/PART/063": {
    "name": "SAADU SANIA",
    "team": "Techspire",
    "verified": true,
    "refNo": "KR-2025-061",
    "type": "Participation"
  },
  "DLG/HO25/PART/064": {
    "name": "Naga Satya Bala Sri Nithya ",
    "team": "Econexus ",
    "verified": true,
    "refNo": "KR-2025-062",
    "type": "Participation"
  },
  "DLG/HO25/PART/065": {
    "name": "Hitesh Sanghi",
    "team": "BINARY BEASTS",
    "verified": true,
    "refNo": "KR-2025-063",
    "type": "Participation"
  },
  "DLG/HO25/PART/066": {
    "name": "Tanmay Porwal",
    "team": "TechVerse",
    "verified": true,
    "refNo": "KR-2025-064",
    "type": "Participation"
  },
  "DLG/HO25/PART/067": {
    "name": "Dheeraj Kumar",
    "team": "NITDominars",
    "verified": true,
    "refNo": "KR-2025-065",
    "type": "Participation"
  },
  "DLG/HO25/PART/068": {
    "name": "Tanishqa Mohite",
    "team": "Tanishqa Mohite",
    "verified": true,
    "refNo": "KR-2025-066",
    "type": "Participation"
  },
  "DLG/HO25/PART/070": {
    "name": "Gowthami Bolleni ",
    "team": "Agriar",
    "verified": true,
    "refNo": "KR-2025-067",
    "type": "Participation"
  },
  "DLG/HO25/PART/071": {
    "name": "Zodrick John ",
    "team": "ILLUMINATI ",
    "verified": true,
    "refNo": "KR-2025-068",
    "type": "Participation"
  },
  "DLG/HO25/PART/072": {
    "name": "SYEDA UMAIMA ",
    "team": "TeamSprouts",
    "verified": true,
    "refNo": "KR-2025-069",
    "type": "Participation"
  },
  "DLG/HO25/PART/073": {
    "name": "Aadarsh jain",
    "team": "Webwizards",
    "verified": true,
    "refNo": "KR-2025-070",
    "type": "Participation"
  },
  "DLG/HO25/PART/074": {
    "name": "Kapil Patidar ",
    "team": "Team Aarambh ",
    "verified": true,
    "refNo": "KR-2025-071",
    "type": "Participation"
  },
  "DLG/HO25/PART/075": {
    "name": "Ramanand Tomar ",
    "team": "NextGen MedTech",
    "verified": true,
    "refNo": "KR-2025-072",
    "type": "Participation"
  },
  "DLG/HO25/PART/076": {
    "name": "Atharva Kailas Harane",
    "team": "Divine DevOps",
    "verified": true,
    "refNo": "KR-2025-073",
    "type": "Participation"
  },
  "DLG/HO25/PART/077": {
    "name": "Neha Singh",
    "team": "TechMates",
    "verified": true,
    "refNo": "KR-2025-074",
    "type": "Participation"
  },
  "DLG/HO25/PART/078": {
    "name": "Anshul Vishwakarma ",
    "team": "Codomania-Legends ",
    "verified": true,
    "refNo": "KR-2025-075",
    "type": "Participation"
  },
  "DLG/HO25/PART/079": {
    "name": "Sahil Sarmalkar",
    "team": "Team Green Guardians",
    "verified": true,
    "refNo": "KR-2025-076",
    "type": "Participation"
  },
  "DLG/HO25/PART/080": {
    "name": "Puja Midde",
    "team": "Innovators",
    "verified": true,
    "refNo": "KR-2025-077",
    "type": "Participation"
  },
  "DLG/HO25/PART/081": {
    "name": "Kaviyashree.P",
    "team": "Team- OrbitOps",
    "verified": true,
    "refNo": "KR-2025-078",
    "type": "Participation"
  },
  "DLG/HO25/PART/082": {
    "name": "Rugweda Yende",
    "team": "Data Miners (AI-luminati)",
    "verified": true,
    "refNo": "KR-2025-079",
    "type": "Participation"
  },
  "DLG/HO25/PART/083": {
    "name": "Arathi Mohan",
    "team": "Ideanova",
    "verified": true,
    "refNo": "KR-2025-080",
    "type": "Participation"
  },
  "DLG/HO25/PART/084": {
    "name": "Pavithra S",
    "team": "Gurlaxy ",
    "verified": true,
    "refNo": "KR-2025-081",
    "type": "Participation"
  },
  "DLG/HO25/PART/085": {
    "name": "Anuj Shrivastava",
    "team": "HackUnite",
    "verified": true,
    "refNo": "KR-2025-082",
    "type": "Participation"
  },
  "DLG/HO25/PART/086": {
    "name": "ISHIKA KANKANE ",
    "team": "NeXus AI",
    "verified": true,
    "refNo": "KR-2025-083",
    "type": "Participation"
  },
  "DLG/HO25/PART/087": {
    "name": "Soorya Prakash R",
    "team": "DevDude",
    "verified": true,
    "refNo": "KR-2025-084",
    "type": "Participation"
  },
  "DLG/HO25/PART/088": {
    "name": "Riya Gupta ",
    "team": "Error 404:: Not found",
    "verified": true,
    "refNo": "KR-2025-085",
    "type": "Participation"
  },
  "DLG/HO25/PART/089": {
    "name": "Devguru Tiwari",
    "team": "!Happening",
    "verified": true,
    "refNo": "KR-2025-086",
    "type": "Participation"
  },
  "DLG/HO25/PART/090": {
    "name": "Anand Raj Tripathi",
    "team": "EXCALLION",
    "verified": true,
    "refNo": "KR-2025-087",
    "type": "Participation"
  },
  "DLG/HO25/PART/091": {
    "name": "Harshinivarsa S.K ",
    "team": "Bytebash",
    "verified": true,
    "refNo": "KR-2025-088",
    "type": "Participation"
  },
  "DLG/HO25/PART/092": {
    "name": "Om suryawanshi ",
    "team": "Nexora",
    "verified": true,
    "refNo": "KR-2025-089",
    "type": "Participation"
  },
  "DLG/HO25/PART/093": {
    "name": "Kumari Shambhavi",
    "team": "Psychic Coders",
    "verified": true,
    "refNo": "KR-2025-090",
    "type": "Participation"
  },
  "DLG/HO25/PART/094": {
    "name": "Yeluguri Mahimanvitha ",
    "team": "Hacknova",
    "verified": true,
    "refNo": "KR-2025-091",
    "type": "Participation"
  },
  "DLG/HO25/PART/095": {
    "name": "Tejas Vilas Wanole",
    "team": "DEad404",
    "verified": true,
    "refNo": "KR-2025-092",
    "type": "Participation"
  },
  "DLG/HO25/PART/096": {
    "name": "Tanishka Sisodiya",
    "team": "HackTan ",
    "verified": true,
    "refNo": "KR-2025-093",
    "type": "Participation"
  },
  "DLG/HO25/PART/097": {
    "name": "Prathamesh Murkute",
    "team": "CodeTrix",
    "verified": true,
    "refNo": "KR-2025-094",
    "type": "Participation"
  },
  "DLG/HO25/PART/098": {
    "name": "Shrey Omer",
    "team": "ARC",
    "verified": true,
    "refNo": "KR-2025-095",
    "type": "Participation"
  },
  "DLG/HO25/PART/099": {
    "name": "Ronit rai ",
    "team": "VRSA coders ",
    "verified": true,
    "refNo": "KR-2025-096",
    "type": "Participation"
  },
  "DLG/HO25/PART/100": {
    "name": "Champia MN ",
    "team": "AgroVibe ",
    "verified": true,
    "refNo": "KR-2025-097",
    "type": "Participation"
  },
  "DLG/HO25/PART/101": {
    "name": "Mohana vamsi gangisetti ",
    "team": "Techboo",
    "verified": true,
    "refNo": "KR-2025-098",
    "type": "Participation"
  },
  "DLG/HO25/PART/102": {
    "name": "Aishwary Bhatt",
    "team": "Trinity.Codes",
    "verified": true,
    "refNo": "KR-2025-099",
    "type": "Participation"
  },
  "DLG/HO25/PART/103": {
    "name": "MEGHA GARG",
    "team": "CodeNest",
    "verified": true,
    "refNo": "KR-2025-100",
    "type": "Participation"
  },
  "DLG/HO25/PART/104": {
    "name": "Prathiksha K",
    "team": "TechNova",
    "verified": true,
    "refNo": "KR-2025-101",
    "type": "Participation"
  },
  "DLG/HO25/PART/105": {
    "name": "Rana Mahek Tejas",
    "team": "Tech Trio ",
    "verified": true,
    "refNo": "KR-2025-102",
    "type": "Participation"
  },
  "DLG/HO25/PART/106": {
    "name": "Rakshitha N",
    "team": "Praxica",
    "verified": true,
    "refNo": "KR-2025-103",
    "type": "Participation"
  },
  "DLG/HO25/PART/107": {
    "name": "Priyanshu Pandey ",
    "team": "Dead Code",
    "verified": true,
    "refNo": "KR-2025-104",
    "type": "Participation"
  },
  "DLG/HO25/PART/108": {
    "name": "Pavni Singh ",
    "team": "Team Debugs",
    "verified": true,
    "refNo": "KR-2025-105",
    "type": "Participation"
  },
  "DLG/HO25/PART/109": {
    "name": "Madhulatha Seerapu",
    "team": "VegaVerse ",
    "verified": true,
    "refNo": "KR-2025-106",
    "type": "Participation"
  },
  "DLG/HO25/PART/110": {
    "name": "Khushi Singh ",
    "team": "SyncNest",
    "verified": true,
    "refNo": "KR-2025-107",
    "type": "Participation"
  },
  "DLG/HO25/PART/111": {
    "name": "Mansi Sahu",
    "team": "FinAvengers ",
    "verified": true,
    "refNo": "KR-2025-108",
    "type": "Participation"
  },
  "DLG/HO25/PART/112": {
    "name": "Jagrati Singhal",
    "team": "Neural Ninjas",
    "verified": true,
    "refNo": "KR-2025-109",
    "type": "Participation"
  },
  "DLG/HO25/PART/113": {
    "name": "Slora Bar",
    "team": "Techtruction ",
    "verified": true,
    "refNo": "KR-2025-110",
    "type": "Participation"
  },
  "DLG/HO25/PART/114": {
    "name": "Vedant soni",
    "team": "Room 104",
    "verified": true,
    "refNo": "KR-2025-111",
    "type": "Participation"
  },
  "DLG/HO25/PART/115": {
    "name": "HARSH SHARMA ",
    "team": "ResQTech ",
    "verified": true,
    "refNo": "KR-2025-112",
    "type": "Participation"
  },
  "DLG/HO25/PART/116": {
    "name": "Sneha Parmar",
    "team": "StellarSync5.O",
    "verified": true,
    "refNo": "KR-2025-113",
    "type": "Participation"
  },
  "DLG/HO25/PART/117": {
    "name": "Riya Pravin Suryawanshi",
    "team": "SheInnovates ",
    "verified": true,
    "refNo": "KR-2025-114",
    "type": "Participation"
  },
  "DLG/HO25/PART/118": {
    "name": "Aditya Somani",
    "team": "Normally Distributed",
    "verified": true,
    "refNo": "KR-2025-115",
    "type": "Participation"
  },
  "DLG/HO25/PART/119": {
    "name": "Vaibhav Chourey",
    "team": "System32",
    "verified": true,
    "refNo": "KR-2025-116",
    "type": "Participation"
  },
  "DLG/HO25/PART/120": {
    "name": "KAMALARANI M",
    "team": "Stack Hackers",
    "verified": true,
    "refNo": "KR-2025-117",
    "type": "Participation"
  },
  "DLG/HO25/PART/121": {
    "name": "L NEELIMA",
    "team": "SYNTAX SQUAD",
    "verified": true,
    "refNo": "KR-2025-118",
    "type": "Participation"
  },
  "DLG/HO25/PART/122": {
    "name": "Milind Garg",
    "team": "Code Mavericks",
    "verified": true,
    "refNo": "KR-2025-119",
    "type": "Participation"
  },
  "DLG/HO25/PART/123": {
    "name": "Aishwarya G M",
    "team": "AIvengers",
    "verified": true,
    "refNo": "KR-2025-120",
    "type": "Participation"
  },
  "DLG/HO25/PART/124": {
    "name": "Sejal Chhapre",
    "team": "Tech Terrors",
    "verified": true,
    "refNo": "KR-2025-121",
    "type": "Participation"
  },
  "DLG/HO25/PART/125": {
    "name": "S DHARANYA ",
    "team": "Tech Sparklers",
    "verified": true,
    "refNo": "KR-2025-122",
    "type": "Participation"
  },
  "DLG/HO25/PART/126": {
    "name": "Mohd Suheb Siddique",
    "team": "Decode",
    "verified": true,
    "refNo": "KR-2025-123",
    "type": "Participation"
  },
  "DLG/HO25/PART/127": {
    "name": "Varad Sandeep Joshi ",
    "team": "HashVault",
    "verified": true,
    "refNo": "KR-2025-124",
    "type": "Participation"
  },
  "DLG/HO25/PART/128": {
    "name": "ANANDH RAJ R",
    "team": "TEAM SRM IST",
    "verified": true,
    "refNo": "KR-2025-125",
    "type": "Participation"
  },
  "DLG/HO25/PART/129": {
    "name": "Rama Thulasi Akula ",
    "team": "Code Hunters",
    "verified": true,
    "refNo": "KR-2025-126",
    "type": "Participation"
  },
  "DLG/HO25/PART/130": {
    "name": "HARISH RAJAK",
    "team": "Code Thrust ",
    "verified": true,
    "refNo": "KR-2025-127",
    "type": "Participation"
  },
  "DLG/HO25/PART/131": {
    "name": "Pragyan Paramita Dutta",
    "team": "Fireflies",
    "verified": true,
    "refNo": "KR-2025-128",
    "type": "Participation"
  },
  "DLG/HO25/PART/132": {
    "name": "Shivam sahu",
    "team": "HACKBOTS",
    "verified": true,
    "refNo": "KR-2025-129",
    "type": "Participation"
  },
  "DLG/HO25/PART/133": {
    "name": "Sanjitaa R",
    "team": "rsanec059",
    "verified": true,
    "refNo": "KR-2025-130",
    "type": "Participation"
  },
  "DLG/HO25/PART/134": {
    "name": "Soham Ainath Penshanwar",
    "team": "RedactGuard",
    "verified": true,
    "refNo": "KR-2025-131",
    "type": "Participation"
  },
  "DLG/HO25/PART/135": {
    "name": "Shivam Raj",
    "team": "Team avyakta ",
    "verified": true,
    "refNo": "KR-2025-132",
    "type": "Participation"
  },
  "DLG/HO25/PART/136": {
    "name": "Krishna Kant",
    "team": "Team Byte Benders",
    "verified": true,
    "refNo": "KR-2025-133",
    "type": "Participation"
  },
  "DLG/HO25/PART/137": {
    "name": "Khushwant Parihar ",
    "team": "BugHunters ",
    "verified": true,
    "refNo": "KR-2025-134",
    "type": "Participation"
  },
  "DLG/HO25/PART/138": {
    "name": "Manasi Choudhari ",
    "team": "Neuromatics ",
    "verified": true,
    "refNo": "KR-2025-135",
    "type": "Participation"
  },
  "DLG/HO25/PART/139": {
    "name": "Rutuja Kale",
    "team": "Central Syntax ",
    "verified": true,
    "refNo": "KR-2025-136",
    "type": "Participation"
  },
  "DLG/HO25/PART/140": {
    "name": "Adarsh goyal ",
    "team": "Unexpected Geniuses",
    "verified": true,
    "refNo": "KR-2025-137",
    "type": "Participation"
  },
  "DLG/HO25/PART/141": {
    "name": "Yatharth Gupta ",
    "team": "404 Found Us",
    "verified": true,
    "refNo": "KR-2025-138",
    "type": "Participation"
  },
  "DLG/HO25/PART/142": {
    "name": "Akshat Chaddha",
    "team": "HighQ",
    "verified": true,
    "refNo": "KR-2025-139",
    "type": "Participation"
  },
  "DLG/HO25/PART/143": {
    "name": "Yuvashree K ",
    "team": "ZENURA",
    "verified": true,
    "refNo": "KR-2025-140",
    "type": "Participation"
  },
  "DLG/HO25/PART/144": {
    "name": "SHAYAN KAZI ",
    "team": "Innoventors ",
    "verified": true,
    "refNo": "KR-2025-141",
    "type": "Participation"
  },
  "DLG/HO25/PART/145": {
    "name": "Pranjal Jain ",
    "team": "Hello World ! ",
    "verified": true,
    "refNo": "KR-2025-142",
    "type": "Participation"
  },
  "DLG/HO25/PART/146": {
    "name": "Hemant",
    "team": "Tensor Titans",
    "verified": true,
    "refNo": "KR-2025-143",
    "type": "Participation"
  },
  "DLG/HO25/PART/147": {
    "name": "Gunjan Pandey ",
    "team": "Hacknova",
    "verified": true,
    "refNo": "KR-2025-144",
    "type": "Participation"
  },
  "DLG/HO25/PART/148": {
    "name": "Prajwal Dashore",
    "team": "AvenCode",
    "verified": true,
    "refNo": "KR-2025-145",
    "type": "Participation"
  },
  "DLG/HO25/PART/149": {
    "name": "Mithurn Jeromme",
    "team": "F22-Raptors",
    "verified": true,
    "refNo": "KR-2025-146",
    "type": "Participation"
  },
  "DLG/HO25/PART/150": {
    "name": "Shah Dev Mineshkumar ",
    "team": "PitchPerfect",
    "verified": true,
    "refNo": "KR-2025-147",
    "type": "Participation"
  },
  "DLG/HO25/PART/151": {
    "name": "Uday Nandaniya",
    "team": "CodeHub",
    "verified": true,
    "refNo": "KR-2025-148",
    "type": "Participation"
  },
  "DLG/HO25/PART/153": {
    "name": "Harshit Bhatia",
    "team": "FreshForge",
    "verified": true,
    "refNo": "KR-2025-149",
    "type": "Participation"
  },
  "DLG/HO25/PART/154": {
    "name": "Vandana Arya",
    "team": "CoDev",
    "verified": true,
    "refNo": "KR-2025-150",
    "type": "Participation"
  },
  "DLG/HO25/PART/155": {
    "name": "Priyanshi Maheshwari ",
    "team": "Greenbridge ",
    "verified": true,
    "refNo": "KR-2025-151",
    "type": "Participation"
  },
  "DLG/HO25/PART/156": {
    "name": "Jappanjot Kaur",
    "team": "TechnoCrats",
    "verified": true,
    "refNo": "KR-2025-152",
    "type": "Participation"
  },
  "DLG/HO25/PART/157": {
    "name": "Charan Reddy Muli",
    "team": "Waghnakhs",
    "verified": true,
    "refNo": "KR-2025-153",
    "type": "Participation"
  },
  "DLG/HO25/PART/158": {
    "name": "Gaurav Thapa",
    "team": "Byte Bandits",
    "verified": true,
    "refNo": "KR-2025-154",
    "type": "Participation"
  },
  "DLG/HO25/PART/159": {
    "name": "Parvathy Prakash ",
    "team": "HAPS",
    "verified": true,
    "refNo": "KR-2025-155",
    "type": "Participation"
  },
  "DLG/HO25/PART/160": {
    "name": "K Chanikya Sri Hari Narayana Dattu ",
    "team": "Imrahc",
    "verified": true,
    "refNo": "KR-2025-156",
    "type": "Participation"
  },
  "DLG/HO25/PART/161": {
    "name": "Kishan shrivastava",
    "team": "THE SQUAD",
    "verified": true,
    "refNo": "KR-2025-157",
    "type": "Participation"
  },
  "DLG/HO25/PART/162": {
    "name": "Mohamed Rafeeq Khan A",
    "team": "HACKATHON HUSTLERS",
    "verified": true,
    "refNo": "KR-2025-158",
    "type": "Participation"
  },
  "DLG/HO25/PART/163": {
    "name": "TANMAY GUHA",
    "team": "404 NOT FOUND",
    "verified": true,
    "refNo": "KR-2025-159",
    "type": "Participation"
  },
  "DLG/HO25/PART/164": {
    "name": "BODDU ADITHYA HARSHITH REDDY ",
    "team": "Codekshatriya",
    "verified": true,
    "refNo": "KR-2025-160",
    "type": "Participation"
  },
  "DLG/HO25/PART/165": {
    "name": "Krisha Pisat",
    "team": "NoClueCrew",
    "verified": true,
    "refNo": "KR-2025-161",
    "type": "Participation"
  },
  "DLG/HO25/PART/166": {
    "name": "Y RATHAN KUMAR REDDY",
    "team": "Kanyarasi",
    "verified": true,
    "refNo": "KR-2025-162",
    "type": "Participation"
  },
  "DLG/HO25/PART/167": {
    "name": "Bhoomika Dunichand Makhija ",
    "team": "QuadraCodes",
    "verified": true,
    "refNo": "KR-2025-163",
    "type": "Participation"
  },
  "DLG/HO25/PART/168": {
    "name": "Pranjal Bansal ",
    "team": "Terminal Tribe ",
    "verified": true,
    "refNo": "KR-2025-164",
    "type": "Participation"
  },
  "DLG/HO25/PART/169": {
    "name": "Adarsh Soni",
    "team": "FireSentinel ",
    "verified": true,
    "refNo": "KR-2025-165",
    "type": "Participation"
  },
  "DLG/HO25/PART/170": {
    "name": "Tanisha Gupta ",
    "team": "Future Forges",
    "verified": true,
    "refNo": "KR-2025-166",
    "type": "Participation"
  },
  "DLG/HO25/PART/171": {
    "name": "Mahak ",
    "team": "404NotFound ",
    "verified": true,
    "refNo": "KR-2025-167",
    "type": "Participation"
  },
  "DLG/HO25/PART/172": {
    "name": "MUKUL NEMA ",
    "team": "Technovians ",
    "verified": true,
    "refNo": "KR-2025-168",
    "type": "Participation"
  },
  "DLG/HO25/PART/173": {
    "name": "Anubhab Rakshit",
    "team": "Code Cuisine ",
    "verified": true,
    "refNo": "KR-2025-169",
    "type": "Participation"
  },
  "DLG/HO25/PART/174": {
    "name": "Arpit Yadav ",
    "team": "The nexus pioneers",
    "verified": true,
    "refNo": "KR-2025-170",
    "type": "Participation"
  },
  "DLG/HO25/PART/175": {
    "name": "Oshan Khati",
    "team": "Aquasync",
    "verified": true,
    "refNo": "KR-2025-171",
    "type": "Participation"
  },
  "DLG/HO25/PART/176": {
    "name": "Usashi Saha ",
    "team": "404_FOUND",
    "verified": true,
    "refNo": "KR-2025-172",
    "type": "Participation"
  },
  "DLG/HO25/PART/177": {
    "name": "Himanshu Kumar ",
    "team": "Intellicore ",
    "verified": true,
    "refNo": "KR-2025-173",
    "type": "Participation"
  },
  "DLG/HO25/PART/178": {
    "name": "KAVYA A",
    "team": "GHOST LAYER",
    "verified": true,
    "refNo": "KR-2025-174",
    "type": "Participation"
  },
  "DLG/HO25/PART/179": {
    "name": "MANASRAJ SHARMA ",
    "team": "TECH NOVA",
    "verified": true,
    "refNo": "KR-2025-175",
    "type": "Participation"
  },
  "DLG/HO25/PART/180": {
    "name": "Alekhya Kanderi",
    "team": "Byte Bandits",
    "verified": true,
    "refNo": "KR-2025-176",
    "type": "Participation"
  },
  "DLG/HO25/PART/181": {
    "name": "Bannaie Greeshma",
    "team": "GreyLions",
    "verified": true,
    "refNo": "KR-2025-177",
    "type": "Participation"
  },
  "DLG/HO25/PART/182": {
    "name": "PRAJJWAL JHA",
    "team": "CODEFATHER",
    "verified": true,
    "refNo": "KR-2025-178",
    "type": "Participation"
  },
  "DLG/HO25/PART/183": {
    "name": "Tanishk Gupta",
    "team": "Bug Busters",
    "verified": true,
    "refNo": "KR-2025-179",
    "type": "Participation"
  },
  "DLG/HO25/PART/184": {
    "name": "Mohammed Ayaz Ahmed ",
    "team": "Coderzz ",
    "verified": true,
    "refNo": "KR-2025-180",
    "type": "Participation"
  },
  "DLG/HO25/PART/185": {
    "name": "Priyanshi Shrivastava ",
    "team": "Kart\u1e5btva",
    "verified": true,
    "refNo": "KR-2025-181",
    "type": "Participation"
  },
  "DLG/HO25/PART/186": {
    "name": "Aishwary Pahariya ",
    "team": "AART-ist ",
    "verified": true,
    "refNo": "KR-2025-182",
    "type": "Participation"
  },
  "DLG/HO25/PART/187": {
    "name": "Ibrahim laskar",
    "team": "Mavericks",
    "verified": true,
    "refNo": "KR-2025-183",
    "type": "Participation"
  },
  "DLG/HO25/PART/188": {
    "name": "kruparani tomar",
    "team": "ChainPass Innovators",
    "verified": true,
    "refNo": "KR-2025-184",
    "type": "Participation"
  },
  "DLG/HO25/PART/189": {
    "name": "Vedant Subhash Alai",
    "team": "Vedant Alai",
    "verified": true,
    "refNo": "KR-2025-185",
    "type": "Participation"
  },
  "DLG/HO25/PART/190": {
    "name": "Ayan Peerzade ",
    "team": "Neural Ninjas",
    "verified": true,
    "refNo": "KR-2025-186",
    "type": "Participation"
  },
  "DLG/HO25/PART/191": {
    "name": "Vaibhav Anuragi ",
    "team": "Watcher",
    "verified": true,
    "refNo": "KR-2025-187",
    "type": "Participation"
  },
  "DLG/HO25/PART/192": {
    "name": "Riddhie Sengar ",
    "team": "Farm2Market",
    "verified": true,
    "refNo": "KR-2025-188",
    "type": "Participation"
  },
  "DLG/HO25/PART/193": {
    "name": "SHUBHAM KUMAR YADAV",
    "team": "ThinkBenders",
    "verified": true,
    "refNo": "KR-2025-189",
    "type": "Participation"
  },
  "DLG/HO25/PART/194": {
    "name": "Jagriti Dwivedi ",
    "team": "Code Catalyst ",
    "verified": true,
    "refNo": "KR-2025-190",
    "type": "Participation"
  },
  "DLG/HO25/PART/195": {
    "name": "Shweta Umbrajkar ",
    "team": "SoloCode",
    "verified": true,
    "refNo": "KR-2025-191",
    "type": "Participation"
  },
  "DLG/HO25/PART/196": {
    "name": "Priyanka Nitesh Kumbhar",
    "team": "CodeCraft",
    "verified": true,
    "refNo": "KR-2025-192",
    "type": "Participation"
  },
  "DLG/HO25/PART/197": {
    "name": "Ravindra Mehra",
    "team": "Alpha001",
    "verified": true,
    "refNo": "KR-2025-193",
    "type": "Participation"
  },
  "DLG/HO25/PART/199": {
    "name": "MD Kamran Akmal ",
    "team": "KADS",
    "verified": true,
    "refNo": "KR-2025-194",
    "type": "Participation"
  },
  "DLG/HO25/PART/200": {
    "name": "Varun Rahatgaonkar",
    "team": "Stranger Strings",
    "verified": true,
    "refNo": "KR-2025-195",
    "type": "Participation"
  },
  "DLG/HO25/PART/201": {
    "name": "Param Singh ",
    "team": "Tech Heroes ",
    "verified": true,
    "refNo": "KR-2025-196",
    "type": "Participation"
  },
  "DLG/HO25/PART/202": {
    "name": "Vipin Pratap ",
    "team": "CodeRonin",
    "verified": true,
    "refNo": "KR-2025-197",
    "type": "Participation"
  },
  "DLG/HO25/PART/203": {
    "name": "Divyanshi sen",
    "team": "DaRKTech",
    "verified": true,
    "refNo": "KR-2025-198",
    "type": "Participation"
  },
  "DLG/HO25/PART/204": {
    "name": "Budde Narasimha Surya Teja ",
    "team": "AGENTOS",
    "verified": true,
    "refNo": "KR-2025-199",
    "type": "Participation"
  },
  "DLG/HO25/PART/205": {
    "name": "Rajeev Raghuwanshi ",
    "team": "Semicolon;",
    "verified": true,
    "refNo": "KR-2025-200",
    "type": "Participation"
  },
  "DLG/HO25/PART/206": {
    "name": "Dhanvi Hiteshkumar Thakkar",
    "team": "The AlgoRhythms",
    "verified": true,
    "refNo": "KR-2025-201",
    "type": "Participation"
  },
  "DLG/HO25/PART/207": {
    "name": "Likhila Vydana ",
    "team": "HackIt",
    "verified": true,
    "refNo": "KR-2025-202",
    "type": "Participation"
  },
  "DLG/HO25/PART/208": {
    "name": "Nandini Jain",
    "team": "Hacking Seconds",
    "verified": true,
    "refNo": "KR-2025-203",
    "type": "Participation"
  },
  "DLG/HO25/PART/209": {
    "name": "TARUN KUSHWAHA",
    "team": "TEAM RUN TIME TERROR",
    "verified": true,
    "refNo": "KR-2025-204",
    "type": "Participation"
  },
  "DLG/HO25/PART/210": {
    "name": "Deepshika Pulluru",
    "team": "prediction pioneers",
    "verified": true,
    "refNo": "KR-2025-205",
    "type": "Participation"
  },
  "DLG/HO25/PART/211": {
    "name": "Yash Ambodekar",
    "team": "Mindflaires",
    "verified": true,
    "refNo": "KR-2025-206",
    "type": "Participation"
  },
  "DLG/HO25/PART/212": {
    "name": "Aman Kumar Srivastav",
    "team": "TARminators",
    "verified": true,
    "refNo": "KR-2025-207",
    "type": "Participation"
  },
  "DLG/HO25/PART/213": {
    "name": "Ansh Kumar Singh",
    "team": "Apex Pioneers",
    "verified": true,
    "refNo": "KR-2025-208",
    "type": "Participation"
  },
  "DLG/HO25/PART/214": {
    "name": "Rishi Juneja",
    "team": "Vibe Coders",
    "verified": true,
    "refNo": "KR-2025-209",
    "type": "Participation"
  },
  "DLG/HO25/PART/215": {
    "name": "Arihant jain",
    "team": "Bug_Busters",
    "verified": true,
    "refNo": "KR-2025-210",
    "type": "Participation"
  },
  "DLG/HO25/PART/216": {
    "name": "Vanshika Dawani",
    "team": "Pixel Pirates",
    "verified": true,
    "refNo": "KR-2025-211",
    "type": "Participation"
  },
  "DLG/HO25/PART/217": {
    "name": "Kanishk Kumar",
    "team": "CyberPunk",
    "verified": true,
    "refNo": "KR-2025-212",
    "type": "Participation"
  },
  "DLG/HO25/PART/218": {
    "name": "Adarsh Balachandar",
    "team": "YeAhML",
    "verified": true,
    "refNo": "KR-2025-213",
    "type": "Participation"
  },
  "DLG/HO25/PART/219": {
    "name": "Thamizharasan K",
    "team": "TechX",
    "verified": true,
    "refNo": "KR-2025-214",
    "type": "Participation"
  },
  "DLG/HO25/PART/220": {
    "name": "Pulastya Bhagwat ",
    "team": "TechRx",
    "verified": true,
    "refNo": "KR-2025-215",
    "type": "Participation"
  },
  "DLG/HO25/PART/221": {
    "name": "Anika Singh",
    "team": "Code marvels",
    "verified": true,
    "refNo": "KR-2025-216",
    "type": "Participation"
  },
  "DLG/HO25/PART/222": {
    "name": "Sai Harshal Gorrela",
    "team": "BINDU",
    "verified": true,
    "refNo": "KR-2025-217",
    "type": "Participation"
  },
  "DLG/HO25/PART/223": {
    "name": "Ansh Gupta",
    "team": "V-OHm",
    "verified": true,
    "refNo": "KR-2025-218",
    "type": "Participation"
  },
  "DLG/HO25/PART/224": {
    "name": "Aman Jain",
    "team": "TEAM 420",
    "verified": true,
    "refNo": "KR-2025-219",
    "type": "Participation"
  },
  "DLG/HO25/PART/225": {
    "name": "Anshuman Singh Thakur ",
    "team": "HackStreet BOYS ",
    "verified": true,
    "refNo": "KR-2025-220",
    "type": "Participation"
  },
  "DLG/HO25/PART/226": {
    "name": "Sahil Javid Mir",
    "team": "Coding Wizard ",
    "verified": true,
    "refNo": "KR-2025-221",
    "type": "Participation"
  },
  "DLG/HO25/PART/227": {
    "name": "Tarinee ",
    "team": "NeuroNovas ",
    "verified": true,
    "refNo": "KR-2025-222",
    "type": "Participation"
  },
  "DLG/HO25/PART/228": {
    "name": "Khushali Begde",
    "team": "khushalibegde18",
    "verified": true,
    "refNo": "KR-2025-223",
    "type": "Participation"
  },
  "DLG/HO25/PART/229": {
    "name": "MUMMADI ADARSH CHARY ",
    "team": "EliteX",
    "verified": true,
    "refNo": "KR-2025-224",
    "type": "Participation"
  },
  "DLG/HO25/PART/231": {
    "name": "Titiksha Yadav",
    "team": "CLAUSEWISE",
    "verified": true,
    "refNo": "KR-2025-225",
    "type": "Participation"
  },
  "DLG/HO25/PART/232": {
    "name": "Chayan Bisai ",
    "team": "chayanbisai43",
    "verified": true,
    "refNo": "KR-2025-226",
    "type": "Participation"
  },
  "DLG/HO25/PART/233": {
    "name": "Atharva Arun Kulkarni",
    "team": "Trinity Minds ",
    "verified": true,
    "refNo": "KR-2025-227",
    "type": "Participation"
  },
  "DLG/HO25/PART/234": {
    "name": "DUSSA VARUN",
    "team": "HackBros",
    "verified": true,
    "refNo": "KR-2025-228",
    "type": "Participation"
  },
  "DLG/HO25/PART/235": {
    "name": "Chinmay Patil",
    "team": "The Weber's",
    "verified": true,
    "refNo": "KR-2025-229",
    "type": "Participation"
  },
  "DLG/HO25/PART/236": {
    "name": "Sangeeta Prasad ",
    "team": "2_Bit_Army",
    "verified": true,
    "refNo": "KR-2025-230",
    "type": "Participation"
  },
  "DLG/HO25/PART/237": {
    "name": "Nidhi Devare",
    "team": "Pitch Perfect",
    "verified": true,
    "refNo": "KR-2025-231",
    "type": "Participation"
  },
  "DLG/HO25/PART/238": {
    "name": "Jahan Sharma",
    "team": "OrbitalCracks",
    "verified": true,
    "refNo": "KR-2025-232",
    "type": "Participation"
  },
  "DLG/HO25/PART/239": {
    "name": "Deepali Chauhan ",
    "team": "Tech Titans ",
    "verified": true,
    "refNo": "KR-2025-233",
    "type": "Participation"
  },
  "DLG/HO25/PART/240": {
    "name": "Mrinal Sahoo",
    "team": "CosmoX",
    "verified": true,
    "refNo": "KR-2025-234",
    "type": "Participation"
  },
  "DLG/HO25/PART/241": {
    "name": "Kishan Kumar ",
    "team": "Operators ",
    "verified": true,
    "refNo": "KR-2025-235",
    "type": "Participation"
  },
  "DLG/HO25/PART/242": {
    "name": "D.Padma Deepika ",
    "team": "Innovators ",
    "verified": true,
    "refNo": "KR-2025-236",
    "type": "Participation"
  },
  "DLG/HO25/PART/243": {
    "name": "Priyanka Prasad ",
    "team": "Tech Med-Aid",
    "verified": true,
    "refNo": "KR-2025-237",
    "type": "Participation"
  },
  "DLG/HO25/PART/244": {
    "name": "Jhnavi Bhadkariya ",
    "team": "JustMe",
    "verified": true,
    "refNo": "KR-2025-238",
    "type": "Participation"
  },
  "DLG/HO25/PART/245": {
    "name": "P. Anil reddy",
    "team": "FAST TRACK",
    "verified": true,
    "refNo": "KR-2025-239",
    "type": "Participation"
  },
  "DLG/HO25/PART/246": {
    "name": "Harshit Raj ",
    "team": "Jai Ho",
    "verified": true,
    "refNo": "KR-2025-240",
    "type": "Participation"
  },
  "DLG/HO25/PART/247": {
    "name": "Labhanshi Bhatia",
    "team": "BixWhizCrew",
    "verified": true,
    "refNo": "KR-2025-241",
    "type": "Participation"
  },
  "DLG/HO25/PART/248": {
    "name": "Arpit Singh",
    "team": "HackSmith",
    "verified": true,
    "refNo": "KR-2025-242",
    "type": "Participation"
  },
  "DLG/HO25/PART/249": {
    "name": "Nishant Sankar Swain ",
    "team": "HacknoTricks",
    "verified": true,
    "refNo": "KR-2025-243",
    "type": "Participation"
  },
  "DLG/HO25/PART/250": {
    "name": "Kaushani Chandra",
    "team": "MetaWorkforce",
    "verified": true,
    "refNo": "KR-2025-244",
    "type": "Participation"
  },
  "DLG/HO25/PART/251": {
    "name": "NAITIK JAIN ",
    "team": "CODE PIRATES ",
    "verified": true,
    "refNo": "KR-2025-245",
    "type": "Participation"
  },
  "DLG/HO25/PART/252": {
    "name": "Pushkaraj Potdar",
    "team": "Tech-Mates",
    "verified": true,
    "refNo": "KR-2025-246",
    "type": "Participation"
  },
  "DLG/HO25/PART/253": {
    "name": "Yojit Bhatt ",
    "team": "CodeHeights ",
    "verified": true,
    "refNo": "KR-2025-247",
    "type": "Participation"
  },
  "DLG/HO25/PART/254": {
    "name": "Nitya Jain",
    "team": "CalmCoders",
    "verified": true,
    "refNo": "KR-2025-248",
    "type": "Participation"
  },
  "DLG/HO25/PART/255": {
    "name": "Dhruv Chaturvedi",
    "team": "Samadhan",
    "verified": true,
    "refNo": "KR-2025-249",
    "type": "Participation"
  },
  "DLG/HO25/PART/256": {
    "name": "Sahil Kodrikar",
    "team": "TEAM SPARKLE",
    "verified": true,
    "refNo": "KR-2025-250",
    "type": "Participation"
  },
  "DLG/HO25/PART/257": {
    "name": "Ashika R",
    "team": "AI MAVERICKS ",
    "verified": true,
    "refNo": "KR-2025-251",
    "type": "Participation"
  },
  "DLG/HO25/PART/258": {
    "name": "Surekha BRUNDAVANAM",
    "team": "CodebySurekha",
    "verified": true,
    "refNo": "KR-2025-252",
    "type": "Participation"
  },
  "DLG/HO25/PART/259": {
    "name": "Riya kaurav ",
    "team": "Algorammers ",
    "verified": true,
    "refNo": "KR-2025-253",
    "type": "Participation"
  },
  "DLG/HO25/PART/260": {
    "name": "Shashank Jain",
    "team": "COCOCODES",
    "verified": true,
    "refNo": "KR-2025-254",
    "type": "Participation"
  },
  "DLG/HO25/PART/261": {
    "name": "MAILAGANI MAHESH ",
    "team": "IRAVOLT ",
    "verified": true,
    "refNo": "KR-2025-255",
    "type": "Participation"
  },
  "DLG/HO25/PART/262": {
    "name": "Bathula Jhansi Rani ",
    "team": "Dynamic Duo ",
    "verified": true,
    "refNo": "KR-2025-256",
    "type": "Participation"
  },
  "DLG/HO25/PART/263": {
    "name": "Farhan khan",
    "team": "Civic code ",
    "verified": true,
    "refNo": "KR-2025-257",
    "type": "Participation"
  },
  "DLG/HO25/PART/264": {
    "name": "B.Charan",
    "team": "K4-SpiritCourage",
    "verified": true,
    "refNo": "KR-2025-258",
    "type": "Participation"
  },
  "DLG/HO25/PART/265": {
    "name": "Krishna Chauhan",
    "team": "Hack4Good",
    "verified": true,
    "refNo": "KR-2025-259",
    "type": "Participation"
  },
  "DLG/HO25/PART/266": {
    "name": "Vivek Jangam",
    "team": "Team White Ravens",
    "verified": true,
    "refNo": "KR-2025-260",
    "type": "Participation"
  },
  "DLG/HO25/PART/268": {
    "name": "Ananya Dhagat",
    "team": "TechDrifters",
    "verified": true,
    "refNo": "KR-2025-261",
    "type": "Participation"
  },
  "DLG/HO25/PART/269": {
    "name": "Aditya Bharadwaj Kusumba",
    "team": "Kurukshetra",
    "verified": true,
    "refNo": "KR-2025-262",
    "type": "Participation"
  },
  "DLG/HO25/PART/270": {
    "name": "Bikash nepali",
    "team": "Hells_chain",
    "verified": true,
    "refNo": "KR-2025-263",
    "type": "Participation"
  },
  "DLG/HO25/PART/271": {
    "name": "A Santo Briana",
    "team": "Quantum Sparks ",
    "verified": true,
    "refNo": "KR-2025-264",
    "type": "Participation"
  },
  "DLG/HO25/PART/272": {
    "name": "Masuma Akhtar ",
    "team": "NextGen Hackers",
    "verified": true,
    "refNo": "KR-2025-265",
    "type": "Participation"
  },
  "DLG/HO25/PART/273": {
    "name": "Fnu chhavi ",
    "team": "Hackstanians ",
    "verified": true,
    "refNo": "KR-2025-266",
    "type": "Participation"
  },
  "DLG/HO25/PART/274": {
    "name": "Garv Gulati",
    "team": "Code Bandits",
    "verified": true,
    "refNo": "KR-2025-267",
    "type": "Participation"
  },
  "DLG/HO25/PART/275": {
    "name": "Tanushree Nayak ",
    "team": "Kangaroo ",
    "verified": true,
    "refNo": "KR-2025-268",
    "type": "Participation"
  },
  "DLG/HO25/PART/276": {
    "name": "Jobenpreet singh ",
    "team": "Orbit",
    "verified": true,
    "refNo": "KR-2025-269",
    "type": "Participation"
  },
  "DLG/HO25/PART/277": {
    "name": "harshita kumawat",
    "team": "THE FIXERS",
    "verified": true,
    "refNo": "KR-2025-270",
    "type": "Participation"
  },
  "DLG/HO25/PART/278": {
    "name": "Soham Deshpande",
    "team": "Neural Ninjas",
    "verified": true,
    "refNo": "KR-2025-271",
    "type": "Participation"
  },
  "DLG/HO25/PART/279": {
    "name": "Paresh R",
    "team": "Green Guard",
    "verified": true,
    "refNo": "KR-2025-272",
    "type": "Participation"
  },
  "DLG/HO25/PART/280": {
    "name": "Khushboo Khator",
    "team": "The Originals",
    "verified": true,
    "refNo": "KR-2025-273",
    "type": "Participation"
  },
  "DLG/HO25/PART/281": {
    "name": "Sakshi Kale ",
    "team": "Nexus",
    "verified": true,
    "refNo": "KR-2025-274",
    "type": "Participation"
  },
  "DLG/HO25/PART/282": {
    "name": "Harshad Jogdande",
    "team": "Tech Titans",
    "verified": true,
    "refNo": "KR-2025-275",
    "type": "Participation"
  },
  "DLG/HO25/PART/284": {
    "name": "Abhinav Tiwari",
    "team": "Apostles",
    "verified": true,
    "refNo": "KR-2025-276",
    "type": "Participation"
  },
  "DLG/HO25/PART/285": {
    "name": "Harshit Sharma ",
    "team": "Health Hack Hero",
    "verified": true,
    "refNo": "KR-2025-277",
    "type": "Participation"
  },
  "DLG/HO25/PART/286": {
    "name": "NARAYANAN P",
    "team": "Sparktons",
    "verified": true,
    "refNo": "KR-2025-278",
    "type": "Participation"
  },
  "DLG/HO25/PART/287": {
    "name": "Madhubrata Sarkar",
    "team": "Codestrom",
    "verified": true,
    "refNo": "KR-2025-279",
    "type": "Participation"
  },
  "DLG/HO25/PART/288": {
    "name": "Kaaviya S",
    "team": "Code innovators",
    "verified": true,
    "refNo": "KR-2025-280",
    "type": "Participation"
  },
  "DLG/HO25/PART/289": {
    "name": "Yashanpreet Kaur",
    "team": "yashanpreet41",
    "verified": true,
    "refNo": "KR-2025-281",
    "type": "Participation"
  },
  "DLG/HO25/PART/290": {
    "name": "Kiran tomar ",
    "team": "Mediminds ",
    "verified": true,
    "refNo": "KR-2025-282",
    "type": "Participation"
  },
  "DLG/HO25/PART/292": {
    "name": "Khushi Shukla ",
    "team": "HackNova ",
    "verified": true,
    "refNo": "KR-2025-283",
    "type": "Participation"
  },
  "DLG/HO25/PART/293": {
    "name": "Zainab Fatima",
    "team": "SheCodes",
    "verified": true,
    "refNo": "KR-2025-284",
    "type": "Participation"
  },
  "DLG/HO25/PART/294": {
    "name": "Abhinandha.K",
    "team": "Quadcore",
    "verified": true,
    "refNo": "KR-2025-285",
    "type": "Participation"
  },
  "DLG/HO25/PART/295": {
    "name": "Pragya Manikanchan Manna",
    "team": "Coders Bay",
    "verified": true,
    "refNo": "KR-2025-286",
    "type": "Participation"
  },
  "DLG/HO25/PART/296": {
    "name": "Shikhar shrivastava",
    "team": "Aura",
    "verified": true,
    "refNo": "KR-2025-287",
    "type": "Participation"
  },
  "DLG/HO25/PART/297": {
    "name": "Poorva Kamat ",
    "team": "SmartCrop Crew ",
    "verified": true,
    "refNo": "KR-2025-288",
    "type": "Participation"
  },
  "DLG/HO25/PART/339": {
    "name": "Kuldeep Rawat",
    "team": "CodeOrbiters",
    "verified": true,
    "refNo": "KR-2025-289",
    "type": "Participation"
  },
  "DLG/HO25/PART/340": {
    "name": "Shivam Vijay Kharat",
    "team": "The Git Reapers",
    "verified": true,
    "refNo": "KR-2025-290",
    "type": "Participation"
  },
  "DLG/HO25/PART/387": {
    "name": "Anway Kishor Yerawar",
    "team": " ErrorVerse ",
    "verified": true,
    "refNo": "KR-2025-291",
    "type": "Participation"
  },
  "DLG/HO25/PART/298": {
    "name": "Moulik Zinzala",
    "team": "VisionX ",
    "verified": true,
    "refNo": "KR-2025-292",
    "type": "Participation"
  },
  "DLG/HO25/PART/388": {
    "name": "Gulabsha Khatoon",
    "team": "     TrackTroop",
    "verified": true,
    "refNo": "KR-2025-293",
    "type": "Participation"
  },
  "DLG/HO25/PART/299": {
    "name": "Prathamesh Dnyaneshwar Kshirsagar",
    "team": "Innovative sparks ",
    "verified": true,
    "refNo": "KR-2025-294",
    "type": "Participation"
  },
  "DLG/HO25/PART/341": {
    "name": "Mayank Rajesh Chauhan",
    "team": "InnovateX",
    "verified": true,
    "refNo": "KR-2025-295",
    "type": "Participation"
  },
  "DLG/HO25/PART/389": {
    "name": "NITYANSH PANT",
    "team": "CORBETT",
    "verified": true,
    "refNo": "KR-2025-296",
    "type": "Participation"
  },
  "DLG/HO25/PART/300": {
    "name": "RUDRAKSH YADAV",
    "team": "HackDuo",
    "verified": true,
    "refNo": "KR-2025-297",
    "type": "Participation"
  },
  "DLG/HO25/PART/839": {
    "name": "Sandip Ghadge",
    "team": "Runtime Terror",
    "verified": true,
    "refNo": "KR-2025-298",
    "type": "Participation"
  },
  "DLG/HO25/PART/390": {
    "name": "Tarun",
    "team": "Mind bridge ",
    "verified": true,
    "refNo": "KR-2025-299",
    "type": "Participation"
  },
  "DLG/HO25/PART/301": {
    "name": "Vasundhra Gupta",
    "team": "Linksters",
    "verified": true,
    "refNo": "KR-2025-300",
    "type": "Participation"
  },
  "DLG/HO25/PART/391": {
    "name": "Akanksha Singh",
    "team": "Code Craft",
    "verified": true,
    "refNo": "KR-2025-301",
    "type": "Participation"
  },
  "DLG/HO25/PART/342": {
    "name": "Shravani Battul",
    "team": "Aurora Health",
    "verified": true,
    "refNo": "KR-2025-302",
    "type": "Participation"
  },
  "DLG/HO25/PART/302": {
    "name": "Akash Ghosh ",
    "team": "AI Avengers ",
    "verified": true,
    "refNo": "KR-2025-303",
    "type": "Participation"
  },
  "DLG/HO25/PART/343": {
    "name": "Ramaneni Srikrishnamurthy Naidu",
    "team": "San",
    "verified": true,
    "refNo": "KR-2025-304",
    "type": "Participation"
  },
  "DLG/HO25/PART/392": {
    "name": "Prashant kumar prabhakar",
    "team": "HPjunios",
    "verified": true,
    "refNo": "KR-2025-305",
    "type": "Participation"
  },
  "DLG/HO25/PART/344": {
    "name": "SHALVI MAHESHWARI",
    "team": "We bare bugs",
    "verified": true,
    "refNo": "KR-2025-306",
    "type": "Participation"
  },
  "DLG/HO25/PART/393": {
    "name": "Shivam Gupta",
    "team": "TechBrix",
    "verified": true,
    "refNo": "KR-2025-307",
    "type": "Participation"
  },
  "DLG/HO25/PART/345": {
    "name": "R. Nethaji",
    "team": "SRM's Innovators ",
    "verified": true,
    "refNo": "KR-2025-308",
    "type": "Participation"
  },
  "DLG/HO25/PART/303": {
    "name": "SWASTI JAIN",
    "team": "CODE CRAFTERS",
    "verified": true,
    "refNo": "KR-2025-309",
    "type": "Participation"
  },
  "DLG/HO25/PART/304": {
    "name": "Aaryanvi Sharma",
    "team": "Calm Coders ",
    "verified": true,
    "refNo": "KR-2025-310",
    "type": "Participation"
  },
  "DLG/HO25/PART/346": {
    "name": "Karimi Upendra",
    "team": "Team Aira",
    "verified": true,
    "refNo": "KR-2025-311",
    "type": "Participation"
  },
  "DLG/HO25/PART/347": {
    "name": "HARSHIT SINGH THAGUNNA",
    "team": "Code Conqueror",
    "verified": true,
    "refNo": "KR-2025-312",
    "type": "Participation"
  },
  "DLG/HO25/PART/305": {
    "name": "Mehul Kumar Singh ",
    "team": "CodeZen",
    "verified": true,
    "refNo": "KR-2025-313",
    "type": "Participation"
  },
  "DLG/HO25/PART/394": {
    "name": "Pranav Kiran Patil",
    "team": "Operators ",
    "verified": true,
    "refNo": "KR-2025-314",
    "type": "Participation"
  },
  "DLG/HO25/PART/306": {
    "name": "M Sri Jaai Meenakshi",
    "team": "Deep Dreamers ",
    "verified": true,
    "refNo": "KR-2025-315",
    "type": "Participation"
  },
  "DLG/HO25/PART/307": {
    "name": "ANUSHA SINGH ",
    "team": "404Ninjas",
    "verified": true,
    "refNo": "KR-2025-316",
    "type": "Participation"
  },
  "DLG/HO25/PART/395": {
    "name": "Nehadiya Saman",
    "team": "WE",
    "verified": true,
    "refNo": "KR-2025-317",
    "type": "Participation"
  },
  "DLG/HO25/PART/396": {
    "name": "Dhanush Karthick K",
    "team": "Tech devils",
    "verified": true,
    "refNo": "KR-2025-318",
    "type": "Participation"
  },
  "DLG/HO25/PART/308": {
    "name": "Anushka ramrao patil",
    "team": "Dev-pirates",
    "verified": true,
    "refNo": "KR-2025-319",
    "type": "Participation"
  },
  "DLG/HO25/PART/349": {
    "name": "Kashish Pahwa",
    "team": "VOICEWEAVERS ",
    "verified": true,
    "refNo": "KR-2025-320",
    "type": "Participation"
  },
  "DLG/HO25/PART/397": {
    "name": "Tushar Kaldate",
    "team": "Declutters",
    "verified": true,
    "refNo": "KR-2025-321",
    "type": "Participation"
  },
  "DLG/HO25/PART/309": {
    "name": "Maddi Lokesh Reddy",
    "team": "Tech Marvels",
    "verified": true,
    "refNo": "KR-2025-322",
    "type": "Participation"
  },
  "DLG/HO25/PART/398": {
    "name": "Devraj Singh Yadav",
    "team": "Recruitech",
    "verified": true,
    "refNo": "KR-2025-323",
    "type": "Participation"
  },
  "DLG/HO25/PART/399": {
    "name": "Durbhakula Dhanurdhar",
    "team": "Team Nexus",
    "verified": true,
    "refNo": "KR-2025-324",
    "type": "Participation"
  },
  "DLG/HO25/PART/350": {
    "name": "ALOK VISHWAKARMA",
    "team": "Prime Innovators ",
    "verified": true,
    "refNo": "KR-2025-325",
    "type": "Participation"
  },
  "DLG/HO25/PART/400": {
    "name": "SIDDHI BAWANKAR",
    "team": "SyncSparks",
    "verified": true,
    "refNo": "KR-2025-326",
    "type": "Participation"
  },
  "DLG/HO25/PART/310": {
    "name": "Nikita Pankaj Chaudhari ",
    "team": "Tech Titans ",
    "verified": true,
    "refNo": "KR-2025-327",
    "type": "Participation"
  },
  "DLG/HO25/PART/351": {
    "name": "Doshi Juhin Hareshbhai",
    "team": "AI Master",
    "verified": true,
    "refNo": "KR-2025-328",
    "type": "Participation"
  },
  "DLG/HO25/PART/401": {
    "name": "Samarth Kale",
    "team": "BIT-DEFENDERS",
    "verified": true,
    "refNo": "KR-2025-329",
    "type": "Participation"
  },
  "DLG/HO25/PART/311": {
    "name": "Vineet Maheshwari",
    "team": "Regresso",
    "verified": true,
    "refNo": "KR-2025-330",
    "type": "Participation"
  },
  "DLG/HO25/PART/312": {
    "name": "Satya Sivani",
    "team": "Econexus ",
    "verified": true,
    "refNo": "KR-2025-331",
    "type": "Participation"
  },
  "DLG/HO25/PART/402": {
    "name": "Kartik Singhal",
    "team": "BINARY BEASTS",
    "verified": true,
    "refNo": "KR-2025-332",
    "type": "Participation"
  },
  "DLG/HO25/PART/313": {
    "name": "Shreya Samal",
    "team": "TechVerse",
    "verified": true,
    "refNo": "KR-2025-333",
    "type": "Participation"
  },
  "DLG/HO25/PART/314": {
    "name": "Daksh Verma",
    "team": "NITDominars",
    "verified": true,
    "refNo": "KR-2025-334",
    "type": "Participation"
  },
  "DLG/HO25/PART/352": {
    "name": "Mohd Aanas",
    "team": "ILLUMINATI ",
    "verified": true,
    "refNo": "KR-2025-335",
    "type": "Participation"
  },
  "DLG/HO25/PART/691": {
    "name": "ZUNAIRAH MAASFA KHAN",
    "team": "TeamSprouts",
    "verified": true,
    "refNo": "KR-2025-336",
    "type": "Participation"
  },
  "DLG/HO25/PART/403": {
    "name": "ASHISH GARG",
    "team": "Webwizards",
    "verified": true,
    "refNo": "KR-2025-337",
    "type": "Participation"
  },
  "DLG/HO25/PART/404": {
    "name": "Priyanshi Verma",
    "team": "Team Aarambh ",
    "verified": true,
    "refNo": "KR-2025-338",
    "type": "Participation"
  },
  "DLG/HO25/PART/405": {
    "name": "Shubh Pandey",
    "team": "NextGen MedTech",
    "verified": true,
    "refNo": "KR-2025-339",
    "type": "Participation"
  },
  "DLG/HO25/PART/353": {
    "name": "Darsh Subhash Kamble",
    "team": "Divine DevOps",
    "verified": true,
    "refNo": "KR-2025-340",
    "type": "Participation"
  },
  "DLG/HO25/PART/315": {
    "name": "Drishti Trivedi",
    "team": "TechMates",
    "verified": true,
    "refNo": "KR-2025-341",
    "type": "Participation"
  },
  "DLG/HO25/PART/316": {
    "name": "Vidhi Agrawal",
    "team": "Codomania-Legends ",
    "verified": true,
    "refNo": "KR-2025-342",
    "type": "Participation"
  },
  "DLG/HO25/PART/406": {
    "name": "Sejal Rai",
    "team": "Team Green Guardians",
    "verified": true,
    "refNo": "KR-2025-343",
    "type": "Participation"
  },
  "DLG/HO25/PART/354": {
    "name": "Ujasvi Mudakala",
    "team": "Innovators",
    "verified": true,
    "refNo": "KR-2025-344",
    "type": "Participation"
  },
  "DLG/HO25/PART/355": {
    "name": "Rohit Kumar Mishra",
    "team": "Team- OrbitOps",
    "verified": true,
    "refNo": "KR-2025-345",
    "type": "Participation"
  },
  "DLG/HO25/PART/407": {
    "name": "AMAYARA GANI",
    "team": "Data Miners (AI-luminati)",
    "verified": true,
    "refNo": "KR-2025-346",
    "type": "Participation"
  },
  "DLG/HO25/PART/408": {
    "name": "Archa sathiesh",
    "team": "Ideanova",
    "verified": true,
    "refNo": "KR-2025-347",
    "type": "Participation"
  },
  "DLG/HO25/PART/356": {
    "name": "Nandhinidevi K",
    "team": "Gurlaxy ",
    "verified": true,
    "refNo": "KR-2025-348",
    "type": "Participation"
  },
  "DLG/HO25/PART/317": {
    "name": "DIVYANSH AGRAWAL",
    "team": "HackUnite",
    "verified": true,
    "refNo": "KR-2025-349",
    "type": "Participation"
  },
  "DLG/HO25/PART/409": {
    "name": "MUSKAN SHARMA",
    "team": "NeXus AI",
    "verified": true,
    "refNo": "KR-2025-350",
    "type": "Participation"
  },
  "DLG/HO25/PART/705": {
    "name": "Srishti Gupta",
    "team": "Error 404:: Not found",
    "verified": true,
    "refNo": "KR-2025-351",
    "type": "Participation"
  },
  "DLG/HO25/PART/357": {
    "name": "Sourav Shukla Baidya",
    "team": "!Happening",
    "verified": true,
    "refNo": "KR-2025-352",
    "type": "Participation"
  },
  "DLG/HO25/PART/410": {
    "name": "Yatharth Urmaliya",
    "team": "EXCALLION",
    "verified": true,
    "refNo": "KR-2025-353",
    "type": "Participation"
  },
  "DLG/HO25/PART/411": {
    "name": "Abishek M",
    "team": "Bytebash",
    "verified": true,
    "refNo": "KR-2025-354",
    "type": "Participation"
  },
  "DLG/HO25/PART/412": {
    "name": "Kartik Narayan Pllaram",
    "team": "Nexora",
    "verified": true,
    "refNo": "KR-2025-355",
    "type": "Participation"
  },
  "DLG/HO25/PART/413": {
    "name": "Sumit Kumar",
    "team": "Psychic Coders",
    "verified": true,
    "refNo": "KR-2025-356",
    "type": "Participation"
  },
  "DLG/HO25/PART/414": {
    "name": "Yarram Neha",
    "team": "Hacknova",
    "verified": true,
    "refNo": "KR-2025-357",
    "type": "Participation"
  },
  "DLG/HO25/PART/358": {
    "name": "Aarya Shriprasad Walke",
    "team": "DEad404",
    "verified": true,
    "refNo": "KR-2025-358",
    "type": "Participation"
  },
  "DLG/HO25/PART/359": {
    "name": "Suraj Baviskar,",
    "team": "CodeTrix",
    "verified": true,
    "refNo": "KR-2025-359",
    "type": "Participation"
  },
  "DLG/HO25/PART/318": {
    "name": "ANUJ SONI",
    "team": "ARC",
    "verified": true,
    "refNo": "KR-2025-360",
    "type": "Participation"
  },
  "DLG/HO25/PART/319": {
    "name": "Vanitha S",
    "team": "AgroVibe ",
    "verified": true,
    "refNo": "KR-2025-361",
    "type": "Participation"
  },
  "DLG/HO25/PART/415": {
    "name": "Krishnkant Lohar",
    "team": "Trinity.Codes",
    "verified": true,
    "refNo": "KR-2025-362",
    "type": "Participation"
  },
  "DLG/HO25/PART/841": {
    "name": "BHUMI SINGH",
    "team": "CodeNest",
    "verified": true,
    "refNo": "KR-2025-363",
    "type": "Participation"
  },
  "DLG/HO25/PART/360": {
    "name": "GAJERA KRISHA ASHVINBHAI",
    "team": "Tech Trio ",
    "verified": true,
    "refNo": "KR-2025-364",
    "type": "Participation"
  },
  "DLG/HO25/PART/416": {
    "name": "K Harish",
    "team": "Dead Code",
    "verified": true,
    "refNo": "KR-2025-365",
    "type": "Participation"
  },
  "DLG/HO25/PART/320": {
    "name": "Kumkum Chauhan ",
    "team": "Team Debugs",
    "verified": true,
    "refNo": "KR-2025-366",
    "type": "Participation"
  },
  "DLG/HO25/PART/361": {
    "name": "SUDHARSHAN PAUL GANTA",
    "team": "VegaVerse ",
    "verified": true,
    "refNo": "KR-2025-367",
    "type": "Participation"
  },
  "DLG/HO25/PART/321": {
    "name": "Yash Yadav",
    "team": "SyncNest",
    "verified": true,
    "refNo": "KR-2025-368",
    "type": "Participation"
  },
  "DLG/HO25/PART/417": {
    "name": "MISHTHY SONI",
    "team": "FinAvengers ",
    "verified": true,
    "refNo": "KR-2025-369",
    "type": "Participation"
  },
  "DLG/HO25/PART/418": {
    "name": "Padam Gupta",
    "team": "Neural Ninjas",
    "verified": true,
    "refNo": "KR-2025-370",
    "type": "Participation"
  },
  "DLG/HO25/PART/419": {
    "name": "SAI BALKAWADE",
    "team": "Techtruction ",
    "verified": true,
    "refNo": "KR-2025-371",
    "type": "Participation"
  },
  "DLG/HO25/PART/697": {
    "name": "Akash Tripathi",
    "team": "Room 104",
    "verified": true,
    "refNo": "KR-2025-372",
    "type": "Participation"
  },
  "DLG/HO25/PART/420": {
    "name": "YASH SHARMA",
    "team": "ResQTech ",
    "verified": true,
    "refNo": "KR-2025-373",
    "type": "Participation"
  },
  "DLG/HO25/PART/421": {
    "name": "Preksha Barjatya",
    "team": "StellarSync5.O",
    "verified": true,
    "refNo": "KR-2025-374",
    "type": "Participation"
  },
  "DLG/HO25/PART/362": {
    "name": "Neelavati Kisan Suryavanshi",
    "team": "SheInnovates ",
    "verified": true,
    "refNo": "KR-2025-375",
    "type": "Participation"
  },
  "DLG/HO25/PART/422": {
    "name": "Atul Khiyani",
    "team": "Normally Distributed",
    "verified": true,
    "refNo": "KR-2025-376",
    "type": "Participation"
  },
  "DLG/HO25/PART/423": {
    "name": "HARSH CHAUDHARY",
    "team": "System32",
    "verified": true,
    "refNo": "KR-2025-377",
    "type": "Participation"
  },
  "DLG/HO25/PART/693": {
    "name": "HARINI MAI V G",
    "team": "Stack Hackers",
    "verified": true,
    "refNo": "KR-2025-378",
    "type": "Participation"
  },
  "DLG/HO25/PART/424": {
    "name": "M OLIVE CHAITANYA",
    "team": "SYNTAX SQUAD",
    "verified": true,
    "refNo": "KR-2025-379",
    "type": "Participation"
  },
  "DLG/HO25/PART/425": {
    "name": "Poorvi Kulshrestha",
    "team": "Code Mavericks",
    "verified": true,
    "refNo": "KR-2025-380",
    "type": "Participation"
  },
  "DLG/HO25/PART/842": {
    "name": "ANIKESH KUMAR",
    "team": "AIvengers",
    "verified": true,
    "refNo": "KR-2025-381",
    "type": "Participation"
  },
  "DLG/HO25/PART/322": {
    "name": "Anuj Soni",
    "team": "Tech Terrors",
    "verified": true,
    "refNo": "KR-2025-382",
    "type": "Participation"
  },
  "DLG/HO25/PART/363": {
    "name": "N Poornasri",
    "team": "Tech Sparklers",
    "verified": true,
    "refNo": "KR-2025-383",
    "type": "Participation"
  },
  "DLG/HO25/PART/364": {
    "name": "Arif Rayeen",
    "team": "Decode",
    "verified": true,
    "refNo": "KR-2025-384",
    "type": "Participation"
  },
  "DLG/HO25/PART/365": {
    "name": "C T Barath,",
    "team": "TEAM SRM IST",
    "verified": true,
    "refNo": "KR-2025-385",
    "type": "Participation"
  },
  "DLG/HO25/PART/426": {
    "name": "Manoj Kumar Reddy Konireddy",
    "team": "Code Hunters",
    "verified": true,
    "refNo": "KR-2025-386",
    "type": "Participation"
  },
  "DLG/HO25/PART/427": {
    "name": "SAKSHI SINGH",
    "team": "Code Thrust ",
    "verified": true,
    "refNo": "KR-2025-387",
    "type": "Participation"
  },
  "DLG/HO25/PART/428": {
    "name": "SNEHA RAKSHIT",
    "team": "Fireflies",
    "verified": true,
    "refNo": "KR-2025-388",
    "type": "Participation"
  },
  "DLG/HO25/PART/429": {
    "name": "RAGINI RATHOUR,",
    "team": "HACKBOTS",
    "verified": true,
    "refNo": "KR-2025-389",
    "type": "Participation"
  },
  "DLG/HO25/PART/323": {
    "name": "Rasika Santosh Thakur",
    "team": "RedactGuard",
    "verified": true,
    "refNo": "KR-2025-390",
    "type": "Participation"
  },
  "DLG/HO25/PART/366": {
    "name": "ANUP KUMAR",
    "team": "Team avyakta ",
    "verified": true,
    "refNo": "KR-2025-391",
    "type": "Participation"
  },
  "DLG/HO25/PART/430": {
    "name": "Harsh Rajpal",
    "team": "Team Byte Benders",
    "verified": true,
    "refNo": "KR-2025-392",
    "type": "Participation"
  },
  "DLG/HO25/PART/367": {
    "name": "Nitin Dadhich",
    "team": "BugHunters ",
    "verified": true,
    "refNo": "KR-2025-393",
    "type": "Participation"
  },
  "DLG/HO25/PART/431": {
    "name": "Suhasi Bari",
    "team": "Neuromatics ",
    "verified": true,
    "refNo": "KR-2025-394",
    "type": "Participation"
  },
  "DLG/HO25/PART/432": {
    "name": "Rakshita Ganjewar",
    "team": "Central Syntax ",
    "verified": true,
    "refNo": "KR-2025-395",
    "type": "Participation"
  },
  "DLG/HO25/PART/703": {
    "name": "Sumit rathore",
    "team": "Unexpected Geniuses",
    "verified": true,
    "refNo": "KR-2025-396",
    "type": "Participation"
  },
  "DLG/HO25/PART/433": {
    "name": "Divyansh Rajput",
    "team": "404 Found Us",
    "verified": true,
    "refNo": "KR-2025-397",
    "type": "Participation"
  },
  "DLG/HO25/PART/368": {
    "name": "Vidhi Khatarkar",
    "team": "HighQ",
    "verified": true,
    "refNo": "KR-2025-398",
    "type": "Participation"
  },
  "DLG/HO25/PART/690": {
    "name": "J.Akshya",
    "team": "ZENURA",
    "verified": true,
    "refNo": "KR-2025-399",
    "type": "Participation"
  },
  "DLG/HO25/PART/324": {
    "name": "VANSH TALYANI",
    "team": "Innoventors ",
    "verified": true,
    "refNo": "KR-2025-400",
    "type": "Participation"
  },
  "DLG/HO25/PART/369": {
    "name": "Ashu",
    "team": "Hello World ! ",
    "verified": true,
    "refNo": "KR-2025-401",
    "type": "Participation"
  },
  "DLG/HO25/PART/434": {
    "name": "Sparsh Patidar",
    "team": "Tensor Titans",
    "verified": true,
    "refNo": "KR-2025-402",
    "type": "Participation"
  },
  "DLG/HO25/PART/370": {
    "name": "Khushi Gupta",
    "team": "Hacknova",
    "verified": true,
    "refNo": "KR-2025-403",
    "type": "Participation"
  },
  "DLG/HO25/PART/435": {
    "name": "PAYAL RAJPUT",
    "team": "AvenCode",
    "verified": true,
    "refNo": "KR-2025-404",
    "type": "Participation"
  },
  "DLG/HO25/PART/325": {
    "name": "Mahee Tibrewal",
    "team": "F22-Raptors",
    "verified": true,
    "refNo": "KR-2025-405",
    "type": "Participation"
  },
  "DLG/HO25/PART/436": {
    "name": "Utsav Savani Dhirajkumar",
    "team": "PitchPerfect",
    "verified": true,
    "refNo": "KR-2025-406",
    "type": "Participation"
  },
  "DLG/HO25/PART/438": {
    "name": "Imanatdeep Kaur Gill",
    "team": "FreshForge",
    "verified": true,
    "refNo": "KR-2025-407",
    "type": "Participation"
  },
  "DLG/HO25/PART/371": {
    "name": "Prabhanshukamal Ahirwar",
    "team": "CoDev",
    "verified": true,
    "refNo": "KR-2025-408",
    "type": "Participation"
  },
  "DLG/HO25/PART/439": {
    "name": "Kanika Jain",
    "team": "Greenbridge ",
    "verified": true,
    "refNo": "KR-2025-409",
    "type": "Participation"
  },
  "DLG/HO25/PART/326": {
    "name": "Riya Kansal",
    "team": "TechnoCrats",
    "verified": true,
    "refNo": "KR-2025-410",
    "type": "Participation"
  },
  "DLG/HO25/PART/440": {
    "name": "Mallampalli Purna Venkata Satish",
    "team": "Waghnakhs",
    "verified": true,
    "refNo": "KR-2025-411",
    "type": "Participation"
  },
  "DLG/HO25/PART/372": {
    "name": "Venkat Sai",
    "team": "Byte Bandits",
    "verified": true,
    "refNo": "KR-2025-412",
    "type": "Participation"
  },
  "DLG/HO25/PART/441": {
    "name": "AARATHI T RAJESH",
    "team": "HAPS",
    "verified": true,
    "refNo": "KR-2025-413",
    "type": "Participation"
  },
  "DLG/HO25/PART/327": {
    "name": "Seera Charmi",
    "team": "Imrahc",
    "verified": true,
    "refNo": "KR-2025-414",
    "type": "Participation"
  },
  "DLG/HO25/PART/442": {
    "name": "Harshit Kadam",
    "team": "THE SQUAD",
    "verified": true,
    "refNo": "KR-2025-415",
    "type": "Participation"
  },
  "DLG/HO25/PART/373": {
    "name": "Raja Samvirtha M.G.K",
    "team": "HACKATHON HUSTLERS",
    "verified": true,
    "refNo": "KR-2025-416",
    "type": "Participation"
  },
  "DLG/HO25/PART/443": {
    "name": "MAYUKH DAS",
    "team": "404 NOT FOUND",
    "verified": true,
    "refNo": "KR-2025-417",
    "type": "Participation"
  },
  "DLG/HO25/PART/444": {
    "name": "PAKALA NEHA",
    "team": "Codekshatriya",
    "verified": true,
    "refNo": "KR-2025-418",
    "type": "Participation"
  },
  "DLG/HO25/PART/374": {
    "name": "Jash Kanu Patel",
    "team": "NoClueCrew",
    "verified": true,
    "refNo": "KR-2025-419",
    "type": "Participation"
  },
  "DLG/HO25/PART/328": {
    "name": "YELLASIRI SANTHAN MAHARSHI REDDY",
    "team": "Kanyarasi",
    "verified": true,
    "refNo": "KR-2025-420",
    "type": "Participation"
  },
  "DLG/HO25/PART/445": {
    "name": "Isha Prakash Palkar",
    "team": "QuadraCodes",
    "verified": true,
    "refNo": "KR-2025-421",
    "type": "Participation"
  },
  "DLG/HO25/PART/446": {
    "name": "Amrit Noor Singh",
    "team": "Terminal Tribe ",
    "verified": true,
    "refNo": "KR-2025-422",
    "type": "Participation"
  },
  "DLG/HO25/PART/447": {
    "name": "Devansh Rai",
    "team": "FireSentinel ",
    "verified": true,
    "refNo": "KR-2025-423",
    "type": "Participation"
  },
  "DLG/HO25/PART/375": {
    "name": "Yashaswi Saxena",
    "team": "Future Forges",
    "verified": true,
    "refNo": "KR-2025-424",
    "type": "Participation"
  },
  "DLG/HO25/PART/448": {
    "name": "Md Gulfam",
    "team": "404NotFound ",
    "verified": true,
    "refNo": "KR-2025-425",
    "type": "Participation"
  },
  "DLG/HO25/PART/329": {
    "name": "HARSHITA SONI ",
    "team": "Technovians ",
    "verified": true,
    "refNo": "KR-2025-426",
    "type": "Participation"
  },
  "DLG/HO25/PART/376": {
    "name": "SRIJIT DAS",
    "team": "Code Cuisine ",
    "verified": true,
    "refNo": "KR-2025-427",
    "type": "Participation"
  },
  "DLG/HO25/PART/377": {
    "name": "Anantika Soni",
    "team": "The nexus pioneers",
    "verified": true,
    "refNo": "KR-2025-428",
    "type": "Participation"
  },
  "DLG/HO25/PART/700": {
    "name": "Kshitiz Naik",
    "team": "Aquasync",
    "verified": true,
    "refNo": "KR-2025-429",
    "type": "Participation"
  },
  "DLG/HO25/PART/378": {
    "name": "AAHANA MALAKAR",
    "team": "404_FOUND",
    "verified": true,
    "refNo": "KR-2025-430",
    "type": "Participation"
  },
  "DLG/HO25/PART/449": {
    "name": "Aditya Kumar",
    "team": "Intellicore ",
    "verified": true,
    "refNo": "KR-2025-431",
    "type": "Participation"
  },
  "DLG/HO25/PART/379": {
    "name": "PADMAVATHI S",
    "team": "GHOST LAYER",
    "verified": true,
    "refNo": "KR-2025-432",
    "type": "Participation"
  },
  "DLG/HO25/PART/450": {
    "name": "DIVYANSH RATHORE",
    "team": "TECH NOVA",
    "verified": true,
    "refNo": "KR-2025-433",
    "type": "Participation"
  },
  "DLG/HO25/PART/695": {
    "name": "Varun Sahu",
    "team": "Byte Bandits",
    "verified": true,
    "refNo": "KR-2025-434",
    "type": "Participation"
  },
  "DLG/HO25/PART/330": {
    "name": "Elion Sakshith T",
    "team": "GreyLions",
    "verified": true,
    "refNo": "KR-2025-435",
    "type": "Participation"
  },
  "DLG/HO25/PART/451": {
    "name": "LUCKY CHATTERJEE",
    "team": "CODEFATHER",
    "verified": true,
    "refNo": "KR-2025-436",
    "type": "Participation"
  },
  "DLG/HO25/PART/380": {
    "name": "Aditya Baware",
    "team": "Bug Busters",
    "verified": true,
    "refNo": "KR-2025-437",
    "type": "Participation"
  },
  "DLG/HO25/PART/381": {
    "name": "FEROZ AHMED",
    "team": "Coderzz ",
    "verified": true,
    "refNo": "KR-2025-438",
    "type": "Participation"
  },
  "DLG/HO25/PART/452": {
    "name": "RAHUL YADAV",
    "team": "AART-ist ",
    "verified": true,
    "refNo": "KR-2025-439",
    "type": "Participation"
  },
  "DLG/HO25/PART/453": {
    "name": "Khushi Rawat",
    "team": "Mavericks",
    "verified": true,
    "refNo": "KR-2025-440",
    "type": "Participation"
  },
  "DLG/HO25/PART/382": {
    "name": "VIDISHA K MISTRY",
    "team": "ChainPass Innovators",
    "verified": true,
    "refNo": "KR-2025-441",
    "type": "Participation"
  },
  "DLG/HO25/PART/383": {
    "name": "Pruthviraj Chavan",
    "team": "Neural Ninjas",
    "verified": true,
    "refNo": "KR-2025-442",
    "type": "Participation"
  },
  "DLG/HO25/PART/331": {
    "name": "KALINDI MISHRA",
    "team": "Watcher",
    "verified": true,
    "refNo": "KR-2025-443",
    "type": "Participation"
  },
  "DLG/HO25/PART/454": {
    "name": "Anupam Nema",
    "team": "Farm2Market",
    "verified": true,
    "refNo": "KR-2025-444",
    "type": "Participation"
  },
  "DLG/HO25/PART/332": {
    "name": "GARIMA GUPTA",
    "team": "ThinkBenders",
    "verified": true,
    "refNo": "KR-2025-445",
    "type": "Participation"
  },
  "DLG/HO25/PART/384": {
    "name": "BHUKYA KEERTHANA",
    "team": "Code Catalyst ",
    "verified": true,
    "refNo": "KR-2025-446",
    "type": "Participation"
  },
  "DLG/HO25/PART/455": {
    "name": "Vedika Ashish Kulkarni",
    "team": "CodeCraft",
    "verified": true,
    "refNo": "KR-2025-447",
    "type": "Participation"
  },
  "DLG/HO25/PART/456": {
    "name": "PRANJAL NAMDEV",
    "team": "Alpha001",
    "verified": true,
    "refNo": "KR-2025-448",
    "type": "Participation"
  },
  "DLG/HO25/PART/457": {
    "name": "T Apoorva ",
    "team": "KADS",
    "verified": true,
    "refNo": "KR-2025-449",
    "type": "Participation"
  },
  "DLG/HO25/PART/458": {
    "name": "Atharva Pingale",
    "team": "Stranger Strings",
    "verified": true,
    "refNo": "KR-2025-450",
    "type": "Participation"
  },
  "DLG/HO25/PART/459": {
    "name": "Krishna Singh",
    "team": "Tech Heroes ",
    "verified": true,
    "refNo": "KR-2025-451",
    "type": "Participation"
  },
  "DLG/HO25/PART/334": {
    "name": "Ravi Singh ",
    "team": "CodeRonin",
    "verified": true,
    "refNo": "KR-2025-452",
    "type": "Participation"
  },
  "DLG/HO25/PART/460": {
    "name": "Tanishka Deshmukh",
    "team": "DaRKTech",
    "verified": true,
    "refNo": "KR-2025-453",
    "type": "Participation"
  },
  "DLG/HO25/PART/461": {
    "name": "Satya Prasad Relangi",
    "team": "AGENTOS",
    "verified": true,
    "refNo": "KR-2025-454",
    "type": "Participation"
  },
  "DLG/HO25/PART/462": {
    "name": "Yashika Sharma",
    "team": "Semicolon;",
    "verified": true,
    "refNo": "KR-2025-455",
    "type": "Participation"
  },
  "DLG/HO25/PART/335": {
    "name": "Prem Jayesh Shah",
    "team": "The AlgoRhythms",
    "verified": true,
    "refNo": "KR-2025-456",
    "type": "Participation"
  },
  "DLG/HO25/PART/336": {
    "name": "VAIDANT SHRIVASTAVA",
    "team": "TEAM RUN TIME TERROR",
    "verified": true,
    "refNo": "KR-2025-457",
    "type": "Participation"
  },
  "DLG/HO25/PART/337": {
    "name": "Sreevani Maddala",
    "team": "prediction pioneers",
    "verified": true,
    "refNo": "KR-2025-458",
    "type": "Participation"
  },
  "DLG/HO25/PART/463": {
    "name": "Tuhin Dutta",
    "team": "TARminators",
    "verified": true,
    "refNo": "KR-2025-459",
    "type": "Participation"
  },
  "DLG/HO25/PART/385": {
    "name": "Sanya Gupta",
    "team": "Apex Pioneers",
    "verified": true,
    "refNo": "KR-2025-460",
    "type": "Participation"
  },
  "DLG/HO25/PART/464": {
    "name": "Disha Chopra",
    "team": "Vibe Coders",
    "verified": true,
    "refNo": "KR-2025-461",
    "type": "Participation"
  },
  "DLG/HO25/PART/386": {
    "name": "Aditya Rajpoot",
    "team": "Bug_Busters",
    "verified": true,
    "refNo": "KR-2025-462",
    "type": "Participation"
  },
  "DLG/HO25/PART/465": {
    "name": "Snehal Hari Kolhe",
    "team": "Pixel Pirates",
    "verified": true,
    "refNo": "KR-2025-463",
    "type": "Participation"
  },
  "DLG/HO25/PART/338": {
    "name": "Rohaan SS",
    "team": "YeAhML",
    "verified": true,
    "refNo": "KR-2025-464",
    "type": "Participation"
  },
  "DLG/HO25/PART/466": {
    "name": "Shyam Sundar R",
    "team": "TechX",
    "verified": true,
    "refNo": "KR-2025-465",
    "type": "Participation"
  },
  "DLG/HO25/PART/467": {
    "name": "Vaidant Chouksey",
    "team": "TechRx",
    "verified": true,
    "refNo": "KR-2025-466",
    "type": "Participation"
  },
  "DLG/HO25/PART/468": {
    "name": "Arjun Chauhan",
    "team": "Code marvels",
    "verified": true,
    "refNo": "KR-2025-467",
    "type": "Participation"
  },
  "DLG/HO25/PART/469": {
    "name": "Aditya Borah",
    "team": "V-OHm",
    "verified": true,
    "refNo": "KR-2025-468",
    "type": "Participation"
  },
  "DLG/HO25/PART/470": {
    "name": "NAMAN KHANDELWAL",
    "team": "TEAM 420",
    "verified": true,
    "refNo": "KR-2025-469",
    "type": "Participation"
  },
  "DLG/HO25/PART/471": {
    "name": "Aashay Sangam",
    "team": "HackStreet BOYS ",
    "verified": true,
    "refNo": "KR-2025-470",
    "type": "Participation"
  },
  "DLG/HO25/PART/708": {
    "name": "VANSHIKA SAMBHER",
    "team": "NeuroNovas ",
    "verified": true,
    "refNo": "KR-2025-471",
    "type": "Participation"
  },
  "DLG/HO25/PART/711": {
    "name": "AMARAGUNDA ABHISHEK",
    "team": "EliteX",
    "verified": true,
    "refNo": "KR-2025-472",
    "type": "Participation"
  },
  "DLG/HO25/PART/717": {
    "name": "PRIYANKSHU SHEET",
    "team": "CLAUSEWISE",
    "verified": true,
    "refNo": "KR-2025-473",
    "type": "Participation"
  },
  "DLG/HO25/PART/720": {
    "name": "Unnati Rahul Bhati",
    "team": "Trinity Minds ",
    "verified": true,
    "refNo": "KR-2025-474",
    "type": "Participation"
  },
  "DLG/HO25/PART/723": {
    "name": "THANGALLAPALLY SAI TEJA",
    "team": "HackBros",
    "verified": true,
    "refNo": "KR-2025-475",
    "type": "Participation"
  },
  "DLG/HO25/PART/726": {
    "name": "Tejas Ruplal Olishetri",
    "team": "The Weber's",
    "verified": true,
    "refNo": "KR-2025-476",
    "type": "Participation"
  },
  "DLG/HO25/PART/727": {
    "name": "SUJATA KUMARI ",
    "team": "2_Bit_Army",
    "verified": true,
    "refNo": "KR-2025-477",
    "type": "Participation"
  },
  "DLG/HO25/PART/728": {
    "name": "Aryan Anil Wankhade",
    "team": "Pitch Perfect",
    "verified": true,
    "refNo": "KR-2025-478",
    "type": "Participation"
  },
  "DLG/HO25/PART/729": {
    "name": "Himanshu Sagar",
    "team": "OrbitalCracks",
    "verified": true,
    "refNo": "KR-2025-479",
    "type": "Participation"
  },
  "DLG/HO25/PART/730": {
    "name": "ABHAY KANOJIA ",
    "team": "Tech Titans ",
    "verified": true,
    "refNo": "KR-2025-480",
    "type": "Participation"
  },
  "DLG/HO25/PART/731": {
    "name": "SOMA CHATTERJEE",
    "team": "CosmoX",
    "verified": true,
    "refNo": "KR-2025-481",
    "type": "Participation"
  },
  "DLG/HO25/PART/734": {
    "name": "Pranav Kiran Patil",
    "team": "Operators ",
    "verified": true,
    "refNo": "KR-2025-482",
    "type": "Participation"
  },
  "DLG/HO25/PART/737": {
    "name": "Santhosshi M",
    "team": "Innovators ",
    "verified": true,
    "refNo": "KR-2025-483",
    "type": "Participation"
  },
  "DLG/HO25/PART/739": {
    "name": "SACHIN JAISWAL",
    "team": "Tech Med-Aid",
    "verified": true,
    "refNo": "KR-2025-484",
    "type": "Participation"
  },
  "DLG/HO25/PART/742": {
    "name": "Pushkar Joshi",
    "team": "Jai Ho",
    "verified": true,
    "refNo": "KR-2025-485",
    "type": "Participation"
  },
  "DLG/HO25/PART/743": {
    "name": "KM Yogita",
    "team": "BixWhizCrew",
    "verified": true,
    "refNo": "KR-2025-486",
    "type": "Participation"
  },
  "DLG/HO25/PART/746": {
    "name": "MAHI GUPTA",
    "team": "HackSmith",
    "verified": true,
    "refNo": "KR-2025-487",
    "type": "Participation"
  },
  "DLG/HO25/PART/747": {
    "name": "Shreya Sannidhi Dash",
    "team": "HacknoTricks",
    "verified": true,
    "refNo": "KR-2025-488",
    "type": "Participation"
  },
  "DLG/HO25/PART/750": {
    "name": "ARYAN SHRIVASTAVA",
    "team": "CODE PIRATES ",
    "verified": true,
    "refNo": "KR-2025-489",
    "type": "Participation"
  },
  "DLG/HO25/PART/753": {
    "name": "HIMANSHI PANDEY",
    "team": "Tech-Mates",
    "verified": true,
    "refNo": "KR-2025-490",
    "type": "Participation"
  },
  "DLG/HO25/PART/755": {
    "name": "Harsh Hirawat ",
    "team": "CalmCoders",
    "verified": true,
    "refNo": "KR-2025-491",
    "type": "Participation"
  },
  "DLG/HO25/PART/756": {
    "name": "Garima Mishra",
    "team": "Samadhan",
    "verified": true,
    "refNo": "KR-2025-492",
    "type": "Participation"
  },
  "DLG/HO25/PART/758": {
    "name": "Sandesh Dongare",
    "team": "TEAM SPARKLE",
    "verified": true,
    "refNo": "KR-2025-493",
    "type": "Participation"
  },
  "DLG/HO25/PART/761": {
    "name": "A.ANITHA",
    "team": "AI MAVERICKS ",
    "verified": true,
    "refNo": "KR-2025-494",
    "type": "Participation"
  },
  "DLG/HO25/PART/763": {
    "name": "Aditi Agrawal ",
    "team": "Algorammers ",
    "verified": true,
    "refNo": "KR-2025-495",
    "type": "Participation"
  },
  "DLG/HO25/PART/764": {
    "name": "Sakshi",
    "team": "COCOCODES",
    "verified": true,
    "refNo": "KR-2025-496",
    "type": "Participation"
  },
  "DLG/HO25/PART/767": {
    "name": "Gorre ashrutha",
    "team": "IRAVOLT ",
    "verified": true,
    "refNo": "KR-2025-497",
    "type": "Participation"
  },
  "DLG/HO25/PART/770": {
    "name": "Kotari Syamala Devi",
    "team": "Dynamic Duo ",
    "verified": true,
    "refNo": "KR-2025-498",
    "type": "Participation"
  },
  "DLG/HO25/PART/771": {
    "name": "AVISHI ASATI",
    "team": "Civic code ",
    "verified": true,
    "refNo": "KR-2025-499",
    "type": "Participation"
  },
  "DLG/HO25/PART/774": {
    "name": "DOPPALAPUDI ROHITH",
    "team": "K4-SpiritCourage",
    "verified": true,
    "refNo": "KR-2025-500",
    "type": "Participation"
  },
  "DLG/HO25/PART/777": {
    "name": "KRATANJALI CHANDEL",
    "team": "Hack4Good",
    "verified": true,
    "refNo": "KR-2025-501",
    "type": "Participation"
  },
  "DLG/HO25/PART/780": {
    "name": "Mrunali Amit Kumbhar",
    "team": "Team White Ravens",
    "verified": true,
    "refNo": "KR-2025-502",
    "type": "Participation"
  },
  "DLG/HO25/PART/786": {
    "name": "AKANKSHA KUMARI",
    "team": "TechDrifters",
    "verified": true,
    "refNo": "KR-2025-503",
    "type": "Participation"
  },
  "DLG/HO25/PART/788": {
    "name": "MOTURI SHIVA GANESH",
    "team": "Kurukshetra",
    "verified": true,
    "refNo": "KR-2025-504",
    "type": "Participation"
  },
  "DLG/HO25/PART/791": {
    "name": "Akshad Vengurlekar",
    "team": "Hells_chain",
    "verified": true,
    "refNo": "KR-2025-505",
    "type": "Participation"
  },
  "DLG/HO25/PART/794": {
    "name": "V Pavatharani",
    "team": "Quantum Sparks ",
    "verified": true,
    "refNo": "KR-2025-506",
    "type": "Participation"
  },
  "DLG/HO25/PART/796": {
    "name": "Ayushi Sharma",
    "team": "NextGen Hackers",
    "verified": true,
    "refNo": "KR-2025-507",
    "type": "Participation"
  },
  "DLG/HO25/PART/798": {
    "name": "Ayush Baghel",
    "team": "Code Bandits",
    "verified": true,
    "refNo": "KR-2025-508",
    "type": "Participation"
  },
  "DLG/HO25/PART/801": {
    "name": "Sakshi Tiwari",
    "team": "Kangaroo ",
    "verified": true,
    "refNo": "KR-2025-509",
    "type": "Participation"
  },
  "DLG/HO25/PART/803": {
    "name": "Karandeep Singh",
    "team": "Orbit",
    "verified": true,
    "refNo": "KR-2025-510",
    "type": "Participation"
  },
  "DLG/HO25/PART/806": {
    "name": "HARSIMRANJEET KAUR",
    "team": "THE FIXERS",
    "verified": true,
    "refNo": "KR-2025-511",
    "type": "Participation"
  },
  "DLG/HO25/PART/809": {
    "name": "Pratik Gajanan Gaikwad",
    "team": "Neural Ninjas",
    "verified": true,
    "refNo": "KR-2025-512",
    "type": "Participation"
  },
  "DLG/HO25/PART/812": {
    "name": "MOKSHITHA KJ  ",
    "team": "Green Guard",
    "verified": true,
    "refNo": "KR-2025-513",
    "type": "Participation"
  },
  "DLG/HO25/PART/813": {
    "name": "Anuj Sharma",
    "team": "The Originals",
    "verified": true,
    "refNo": "KR-2025-514",
    "type": "Participation"
  },
  "DLG/HO25/PART/816": {
    "name": "Prathamesh Pramod Kale",
    "team": "Nexus",
    "verified": true,
    "refNo": "KR-2025-515",
    "type": "Participation"
  },
  "DLG/HO25/PART/817": {
    "name": "Niraj Ukare",
    "team": "Tech Titans",
    "verified": true,
    "refNo": "KR-2025-516",
    "type": "Participation"
  },
  "DLG/HO25/PART/821": {
    "name": "Aradhy Singh Raghav",
    "team": "Apostles",
    "verified": true,
    "refNo": "KR-2025-517",
    "type": "Participation"
  },
  "DLG/HO25/PART/823": {
    "name": "Aswini C S",
    "team": "Sparktons",
    "verified": true,
    "refNo": "KR-2025-518",
    "type": "Participation"
  },
  "DLG/HO25/PART/824": {
    "name": "Amar kumar",
    "team": "Codestrom",
    "verified": true,
    "refNo": "KR-2025-519",
    "type": "Participation"
  },
  "DLG/HO25/PART/825": {
    "name": "Lohitha Sai K",
    "team": "Code innovators",
    "verified": true,
    "refNo": "KR-2025-520",
    "type": "Participation"
  },
  "DLG/HO25/PART/826": {
    "name": "Vansh",
    "team": "yashanpreet41",
    "verified": true,
    "refNo": "KR-2025-521",
    "type": "Participation"
  },
  "DLG/HO25/PART/829": {
    "name": "AKANSHA SINGH TOMAR",
    "team": "Mediminds ",
    "verified": true,
    "refNo": "KR-2025-522",
    "type": "Participation"
  },
  "DLG/HO25/PART/830": {
    "name": "Shravanya Andhale",
    "team": "HackNova ",
    "verified": true,
    "refNo": "KR-2025-523",
    "type": "Participation"
  },
  "DLG/HO25/PART/833": {
    "name": "Jayanth.N",
    "team": "Quadcore",
    "verified": true,
    "refNo": "KR-2025-524",
    "type": "Participation"
  },
  "DLG/HO25/PART/835": {
    "name": "Kasturi Sanjay Bangar",
    "team": "Coders Bay",
    "verified": true,
    "refNo": "KR-2025-525",
    "type": "Participation"
  },
  "DLG/HO25/PART/836": {
    "name": "ANANYA JAIN",
    "team": "Aura",
    "verified": true,
    "refNo": "KR-2025-526",
    "type": "Participation"
  },
  "DLG/HO25/PART/472": {
    "name": "Anush Yadav",
    "team": "CodeOrbiters",
    "verified": true,
    "refNo": "KR-2025-527",
    "type": "Participation"
  },
  "DLG/HO25/PART/473": {
    "name": "Kaushal Loya",
    "team": "The Git Reapers",
    "verified": true,
    "refNo": "KR-2025-528",
    "type": "Participation"
  },
  "DLG/HO25/PART/520": {
    "name": "Atharva Manohar Borkar",
    "team": " ErrorVerse ",
    "verified": true,
    "refNo": "KR-2025-529",
    "type": "Participation"
  },
  "DLG/HO25/PART/521": {
    "name": "Sakshi Kumari",
    "team": "     TrackTroop",
    "verified": true,
    "refNo": "KR-2025-530",
    "type": "Participation"
  },
  "DLG/HO25/PART/843": {
    "name": "Komal Baliram Suse ",
    "team": "Innovative sparks ",
    "verified": true,
    "refNo": "KR-2025-531",
    "type": "Participation"
  },
  "DLG/HO25/PART/474": {
    "name": "Sujal Chaudhari",
    "team": "InnovateX",
    "verified": true,
    "refNo": "KR-2025-532",
    "type": "Participation"
  },
  "DLG/HO25/PART/522": {
    "name": "MAITTRI TRIPATHI",
    "team": "CORBETT",
    "verified": true,
    "refNo": "KR-2025-533",
    "type": "Participation"
  },
  "DLG/HO25/PART/523": {
    "name": "Manav",
    "team": "Mind bridge ",
    "verified": true,
    "refNo": "KR-2025-534",
    "type": "Participation"
  },
  "DLG/HO25/PART/524": {
    "name": "Sarthak Verma",
    "team": "Code Craft",
    "verified": true,
    "refNo": "KR-2025-535",
    "type": "Participation"
  },
  "DLG/HO25/PART/475": {
    "name": "Aishwarya Patil",
    "team": "Aurora Health",
    "verified": true,
    "refNo": "KR-2025-536",
    "type": "Participation"
  },
  "DLG/HO25/PART/476": {
    "name": "Awura Akua Twumasi ",
    "team": "San",
    "verified": true,
    "refNo": "KR-2025-537",
    "type": "Participation"
  },
  "DLG/HO25/PART/525": {
    "name": "Praveen Namdev",
    "team": "HPjunios",
    "verified": true,
    "refNo": "KR-2025-538",
    "type": "Participation"
  },
  "DLG/HO25/PART/477": {
    "name": "LAUKIKA SHINDE",
    "team": "We bare bugs",
    "verified": true,
    "refNo": "KR-2025-539",
    "type": "Participation"
  },
  "DLG/HO25/PART/526": {
    "name": "Syed Hamish Nehal",
    "team": "TechBrix",
    "verified": true,
    "refNo": "KR-2025-540",
    "type": "Participation"
  },
  "DLG/HO25/PART/478": {
    "name": "Vigneshwaran C",
    "team": "SRM's Innovators ",
    "verified": true,
    "refNo": "KR-2025-541",
    "type": "Participation"
  },
  "DLG/HO25/PART/479": {
    "name": "Gurugubelli Sandeep ",
    "team": "Team Aira",
    "verified": true,
    "refNo": "KR-2025-542",
    "type": "Participation"
  },
  "DLG/HO25/PART/480": {
    "name": "JATIN MEHTA",
    "team": "Code Conqueror",
    "verified": true,
    "refNo": "KR-2025-543",
    "type": "Participation"
  },
  "DLG/HO25/PART/527": {
    "name": "Raunav Yadav",
    "team": "Operators ",
    "verified": true,
    "refNo": "KR-2025-544",
    "type": "Participation"
  },
  "DLG/HO25/PART/528": {
    "name": "Sara Fathima",
    "team": "WE",
    "verified": true,
    "refNo": "KR-2025-545",
    "type": "Participation"
  },
  "DLG/HO25/PART/529": {
    "name": "Manoj Kumar T",
    "team": "Tech devils",
    "verified": true,
    "refNo": "KR-2025-546",
    "type": "Participation"
  },
  "DLG/HO25/PART/482": {
    "name": "Darpan Choudhary",
    "team": "VOICEWEAVERS ",
    "verified": true,
    "refNo": "KR-2025-547",
    "type": "Participation"
  },
  "DLG/HO25/PART/530": {
    "name": "Pranshu Bobade",
    "team": "Declutters",
    "verified": true,
    "refNo": "KR-2025-548",
    "type": "Participation"
  },
  "DLG/HO25/PART/531": {
    "name": "Harshit Tiwari",
    "team": "Recruitech",
    "verified": true,
    "refNo": "KR-2025-549",
    "type": "Participation"
  },
  "DLG/HO25/PART/532": {
    "name": "Kovoor Dheeraj",
    "team": "Team Nexus",
    "verified": true,
    "refNo": "KR-2025-550",
    "type": "Participation"
  },
  "DLG/HO25/PART/483": {
    "name": "PUSHKAR NISHAD",
    "team": "Prime Innovators ",
    "verified": true,
    "refNo": "KR-2025-551",
    "type": "Participation"
  },
  "DLG/HO25/PART/533": {
    "name": "NANDSHREE DHANASKAR",
    "team": "SyncSparks",
    "verified": true,
    "refNo": "KR-2025-552",
    "type": "Participation"
  },
  "DLG/HO25/PART/484": {
    "name": "Patel Shivani Prakashbhai",
    "team": "AI Master",
    "verified": true,
    "refNo": "KR-2025-553",
    "type": "Participation"
  },
  "DLG/HO25/PART/534": {
    "name": "Abhinaya Gowda",
    "team": "BIT-DEFENDERS",
    "verified": true,
    "refNo": "KR-2025-554",
    "type": "Participation"
  },
  "DLG/HO25/PART/844": {
    "name": "Anit Patel",
    "team": "Regresso",
    "verified": true,
    "refNo": "KR-2025-555",
    "type": "Participation"
  },
  "DLG/HO25/PART/535": {
    "name": "Ekagra Gangil",
    "team": "BINARY BEASTS",
    "verified": true,
    "refNo": "KR-2025-556",
    "type": "Participation"
  },
  "DLG/HO25/PART/485": {
    "name": "Farahim",
    "team": "ILLUMINATI ",
    "verified": true,
    "refNo": "KR-2025-557",
    "type": "Participation"
  },
  "DLG/HO25/PART/692": {
    "name": "TANVEER TARANNUM",
    "team": "TeamSprouts",
    "verified": true,
    "refNo": "KR-2025-558",
    "type": "Participation"
  },
  "DLG/HO25/PART/536": {
    "name": "CHAHAT BHATIJA",
    "team": "Webwizards",
    "verified": true,
    "refNo": "KR-2025-559",
    "type": "Participation"
  },
  "DLG/HO25/PART/537": {
    "name": "Hariom Patidar",
    "team": "Team Aarambh ",
    "verified": true,
    "refNo": "KR-2025-560",
    "type": "Participation"
  },
  "DLG/HO25/PART/538": {
    "name": "Rohit Patankar",
    "team": "NextGen MedTech",
    "verified": true,
    "refNo": "KR-2025-561",
    "type": "Participation"
  },
  "DLG/HO25/PART/486": {
    "name": "Pratik Sanjay Jadhav",
    "team": "Divine DevOps",
    "verified": true,
    "refNo": "KR-2025-562",
    "type": "Participation"
  },
  "DLG/HO25/PART/539": {
    "name": "Shubham Sawant",
    "team": "Team Green Guardians",
    "verified": true,
    "refNo": "KR-2025-563",
    "type": "Participation"
  },
  "DLG/HO25/PART/487": {
    "name": "Sreenidhi Ennala ",
    "team": "Innovators",
    "verified": true,
    "refNo": "KR-2025-564",
    "type": "Participation"
  },
  "DLG/HO25/PART/488": {
    "name": "VARSHINI C",
    "team": "Team- OrbitOps",
    "verified": true,
    "refNo": "KR-2025-565",
    "type": "Participation"
  },
  "DLG/HO25/PART/540": {
    "name": "SHREYA GANJEWAR",
    "team": "Data Miners (AI-luminati)",
    "verified": true,
    "refNo": "KR-2025-566",
    "type": "Participation"
  },
  "DLG/HO25/PART/541": {
    "name": "Athul Zacharia Alex",
    "team": "Ideanova",
    "verified": true,
    "refNo": "KR-2025-567",
    "type": "Participation"
  },
  "DLG/HO25/PART/489": {
    "name": "Eswari E",
    "team": "Gurlaxy ",
    "verified": true,
    "refNo": "KR-2025-568",
    "type": "Participation"
  },
  "DLG/HO25/PART/542": {
    "name": "SAHIL CHOUDHARY",
    "team": "NeXus AI",
    "verified": true,
    "refNo": "KR-2025-569",
    "type": "Participation"
  },
  "DLG/HO25/PART/706": {
    "name": "Kaustubh Gulwade",
    "team": "Error 404:: Not found",
    "verified": true,
    "refNo": "KR-2025-570",
    "type": "Participation"
  },
  "DLG/HO25/PART/490": {
    "name": "Abhinav Rajesh Jha",
    "team": "!Happening",
    "verified": true,
    "refNo": "KR-2025-571",
    "type": "Participation"
  },
  "DLG/HO25/PART/543": {
    "name": "Pranjal Gupta",
    "team": "EXCALLION",
    "verified": true,
    "refNo": "KR-2025-572",
    "type": "Participation"
  },
  "DLG/HO25/PART/544": {
    "name": "Harini Chinnasamy",
    "team": "Bytebash",
    "verified": true,
    "refNo": "KR-2025-573",
    "type": "Participation"
  },
  "DLG/HO25/PART/545": {
    "name": "Raj Rajeshwar Yadav",
    "team": "Nexora",
    "verified": true,
    "refNo": "KR-2025-574",
    "type": "Participation"
  },
  "DLG/HO25/PART/546": {
    "name": "Pritish Kumar",
    "team": "Psychic Coders",
    "verified": true,
    "refNo": "KR-2025-575",
    "type": "Participation"
  },
  "DLG/HO25/PART/547": {
    "name": "Yadlapalli Snehitha",
    "team": "Hacknova",
    "verified": true,
    "refNo": "KR-2025-576",
    "type": "Participation"
  },
  "DLG/HO25/PART/491": {
    "name": "Anuja Dasharath Sawant",
    "team": "DEad404",
    "verified": true,
    "refNo": "KR-2025-577",
    "type": "Participation"
  },
  "DLG/HO25/PART/492": {
    "name": "Ashish Kumar",
    "team": "CodeTrix",
    "verified": true,
    "refNo": "KR-2025-578",
    "type": "Participation"
  },
  "DLG/HO25/PART/548": {
    "name": "Nikhil Nagar",
    "team": "Trinity.Codes",
    "verified": true,
    "refNo": "KR-2025-579",
    "type": "Participation"
  },
  "DLG/HO25/PART/493": {
    "name": "PATEL AYUSHIBEN CHETANKUMAR",
    "team": "Tech Trio ",
    "verified": true,
    "refNo": "KR-2025-580",
    "type": "Participation"
  },
  "DLG/HO25/PART/549": {
    "name": "Soumodeep Santra,",
    "team": "Dead Code",
    "verified": true,
    "refNo": "KR-2025-581",
    "type": "Participation"
  },
  "DLG/HO25/PART/494": {
    "name": "SREE HARSHA ALAPATI",
    "team": "VegaVerse ",
    "verified": true,
    "refNo": "KR-2025-582",
    "type": "Participation"
  },
  "DLG/HO25/PART/550": {
    "name": "MITALI GAUTAM",
    "team": "FinAvengers ",
    "verified": true,
    "refNo": "KR-2025-583",
    "type": "Participation"
  },
  "DLG/HO25/PART/551": {
    "name": "Ayush Gupta",
    "team": "Neural Ninjas",
    "verified": true,
    "refNo": "KR-2025-584",
    "type": "Participation"
  },
  "DLG/HO25/PART/552": {
    "name": "SWAR CHURI",
    "team": "Techtruction ",
    "verified": true,
    "refNo": "KR-2025-585",
    "type": "Participation"
  },
  "DLG/HO25/PART/698": {
    "name": "Kazim Sheikh",
    "team": "Room 104",
    "verified": true,
    "refNo": "KR-2025-586",
    "type": "Participation"
  },
  "DLG/HO25/PART/553": {
    "name": "SHIVANI RAWAT",
    "team": "ResQTech ",
    "verified": true,
    "refNo": "KR-2025-587",
    "type": "Participation"
  },
  "DLG/HO25/PART/554": {
    "name": "Sudhanshu Sharma",
    "team": "StellarSync5.O",
    "verified": true,
    "refNo": "KR-2025-588",
    "type": "Participation"
  },
  "DLG/HO25/PART/495": {
    "name": "Tanvi Jayant Chaudhari",
    "team": "SheInnovates ",
    "verified": true,
    "refNo": "KR-2025-589",
    "type": "Participation"
  },
  "DLG/HO25/PART/555": {
    "name": "Annepu Pawan Kumar",
    "team": "Normally Distributed",
    "verified": true,
    "refNo": "KR-2025-590",
    "type": "Participation"
  },
  "DLG/HO25/PART/556": {
    "name": "ANSHUL MEHRA",
    "team": "System32",
    "verified": true,
    "refNo": "KR-2025-591",
    "type": "Participation"
  },
  "DLG/HO25/PART/694": {
    "name": "ROSHINI K",
    "team": "Stack Hackers",
    "verified": true,
    "refNo": "KR-2025-592",
    "type": "Participation"
  },
  "DLG/HO25/PART/557": {
    "name": "K NARENDRA KUMAR",
    "team": "SYNTAX SQUAD",
    "verified": true,
    "refNo": "KR-2025-593",
    "type": "Participation"
  },
  "DLG/HO25/PART/558": {
    "name": "Utsav Kumawat",
    "team": "Code Mavericks",
    "verified": true,
    "refNo": "KR-2025-594",
    "type": "Participation"
  },
  "DLG/HO25/PART/496": {
    "name": "K Bavin",
    "team": "Tech Sparklers",
    "verified": true,
    "refNo": "KR-2025-595",
    "type": "Participation"
  },
  "DLG/HO25/PART/497": {
    "name": "Rohit Raj",
    "team": "Decode",
    "verified": true,
    "refNo": "KR-2025-596",
    "type": "Participation"
  },
  "DLG/HO25/PART/498": {
    "name": "Abhishek S",
    "team": "TEAM SRM IST",
    "verified": true,
    "refNo": "KR-2025-597",
    "type": "Participation"
  },
  "DLG/HO25/PART/559": {
    "name": "Manoj Meka",
    "team": "Code Hunters",
    "verified": true,
    "refNo": "KR-2025-598",
    "type": "Participation"
  },
  "DLG/HO25/PART/560": {
    "name": "RAMAKANT SHUKLA",
    "team": "Code Thrust ",
    "verified": true,
    "refNo": "KR-2025-599",
    "type": "Participation"
  },
  "DLG/HO25/PART/561": {
    "name": "HANSIKA DEBNATH",
    "team": "Fireflies",
    "verified": true,
    "refNo": "KR-2025-600",
    "type": "Participation"
  },
  "DLG/HO25/PART/562": {
    "name": "LEENA CHANDRAKAR,",
    "team": "HACKBOTS",
    "verified": true,
    "refNo": "KR-2025-601",
    "type": "Participation"
  },
  "DLG/HO25/PART/499": {
    "name": "AMIT KUMAR",
    "team": "Team avyakta ",
    "verified": true,
    "refNo": "KR-2025-602",
    "type": "Participation"
  },
  "DLG/HO25/PART/563": {
    "name": "Arpit Gupta",
    "team": "Team Byte Benders",
    "verified": true,
    "refNo": "KR-2025-603",
    "type": "Participation"
  },
  "DLG/HO25/PART/500": {
    "name": "Jatin Das",
    "team": "BugHunters ",
    "verified": true,
    "refNo": "KR-2025-604",
    "type": "Participation"
  },
  "DLG/HO25/PART/564": {
    "name": "Sainath Chavan",
    "team": "Neuromatics ",
    "verified": true,
    "refNo": "KR-2025-605",
    "type": "Participation"
  },
  "DLG/HO25/PART/565": {
    "name": "Rahi Padwal",
    "team": "Central Syntax ",
    "verified": true,
    "refNo": "KR-2025-606",
    "type": "Participation"
  },
  "DLG/HO25/PART/704": {
    "name": "Himanshu Singh kyariya",
    "team": "Unexpected Geniuses",
    "verified": true,
    "refNo": "KR-2025-607",
    "type": "Participation"
  },
  "DLG/HO25/PART/566": {
    "name": "Raghav Goyal",
    "team": "404 Found Us",
    "verified": true,
    "refNo": "KR-2025-608",
    "type": "Participation"
  },
  "DLG/HO25/PART/501": {
    "name": "Adhiraj Bhadauria",
    "team": "HighQ",
    "verified": true,
    "refNo": "KR-2025-609",
    "type": "Participation"
  },
  "DLG/HO25/PART/838": {
    "name": "K.V.Diksha",
    "team": "ZENURA",
    "verified": true,
    "refNo": "KR-2025-610",
    "type": "Participation"
  },
  "DLG/HO25/PART/845": {
    "name": "SWAYAM KEWLANI ",
    "team": "Innoventors ",
    "verified": true,
    "refNo": "KR-2025-611",
    "type": "Participation"
  },
  "DLG/HO25/PART/502": {
    "name": "Shaivya Kushwah",
    "team": "Hello World ! ",
    "verified": true,
    "refNo": "KR-2025-612",
    "type": "Participation"
  },
  "DLG/HO25/PART/567": {
    "name": "Khwaish Yadav",
    "team": "Tensor Titans",
    "verified": true,
    "refNo": "KR-2025-613",
    "type": "Participation"
  },
  "DLG/HO25/PART/503": {
    "name": "Harshita Singh",
    "team": "Hacknova",
    "verified": true,
    "refNo": "KR-2025-614",
    "type": "Participation"
  },
  "DLG/HO25/PART/568": {
    "name": "PAWNI GOUR",
    "team": "AvenCode",
    "verified": true,
    "refNo": "KR-2025-615",
    "type": "Participation"
  },
  "DLG/HO25/PART/569": {
    "name": "Meet Shah Hirenkumar",
    "team": "PitchPerfect",
    "verified": true,
    "refNo": "KR-2025-616",
    "type": "Participation"
  },
  "DLG/HO25/PART/571": {
    "name": "Shivangi Sharma",
    "team": "FreshForge",
    "verified": true,
    "refNo": "KR-2025-617",
    "type": "Participation"
  },
  "DLG/HO25/PART/504": {
    "name": "Vishakha Ahirwar",
    "team": "CoDev",
    "verified": true,
    "refNo": "KR-2025-618",
    "type": "Participation"
  },
  "DLG/HO25/PART/572": {
    "name": "Harshita Basantani",
    "team": "Greenbridge ",
    "verified": true,
    "refNo": "KR-2025-619",
    "type": "Participation"
  },
  "DLG/HO25/PART/573": {
    "name": "Shailesh Yalamanchi",
    "team": "Waghnakhs",
    "verified": true,
    "refNo": "KR-2025-620",
    "type": "Participation"
  },
  "DLG/HO25/PART/505": {
    "name": "Utkarsh Shrivas",
    "team": "Byte Bandits",
    "verified": true,
    "refNo": "KR-2025-621",
    "type": "Participation"
  },
  "DLG/HO25/PART/574": {
    "name": "SNEHA P J",
    "team": "HAPS",
    "verified": true,
    "refNo": "KR-2025-622",
    "type": "Participation"
  },
  "DLG/HO25/PART/575": {
    "name": "Lavanya Tiwari",
    "team": "THE SQUAD",
    "verified": true,
    "refNo": "KR-2025-623",
    "type": "Participation"
  },
  "DLG/HO25/PART/506": {
    "name": "Madhushree M",
    "team": "HACKATHON HUSTLERS",
    "verified": true,
    "refNo": "KR-2025-624",
    "type": "Participation"
  },
  "DLG/HO25/PART/576": {
    "name": "LIPSA POREL",
    "team": "404 NOT FOUND",
    "verified": true,
    "refNo": "KR-2025-625",
    "type": "Participation"
  },
  "DLG/HO25/PART/577": {
    "name": "SHAIK ASHARAF",
    "team": "Codekshatriya",
    "verified": true,
    "refNo": "KR-2025-626",
    "type": "Participation"
  },
  "DLG/HO25/PART/507": {
    "name": "Manasa Lakshmi Ganti",
    "team": "NoClueCrew",
    "verified": true,
    "refNo": "KR-2025-627",
    "type": "Participation"
  },
  "DLG/HO25/PART/578": {
    "name": "Hanishka Vinay Kataria",
    "team": "QuadraCodes",
    "verified": true,
    "refNo": "KR-2025-628",
    "type": "Participation"
  },
  "DLG/HO25/PART/579": {
    "name": "Madhav Kalra",
    "team": "Terminal Tribe ",
    "verified": true,
    "refNo": "KR-2025-629",
    "type": "Participation"
  },
  "DLG/HO25/PART/580": {
    "name": "Aditya Singh Tomar",
    "team": "FireSentinel ",
    "verified": true,
    "refNo": "KR-2025-630",
    "type": "Participation"
  },
  "DLG/HO25/PART/508": {
    "name": "pratiksha kaushil",
    "team": "Future Forges",
    "verified": true,
    "refNo": "KR-2025-631",
    "type": "Participation"
  },
  "DLG/HO25/PART/581": {
    "name": "Arghadeep Das",
    "team": "404NotFound ",
    "verified": true,
    "refNo": "KR-2025-632",
    "type": "Participation"
  },
  "DLG/HO25/PART/509": {
    "name": "SHANKHANIL SAHA",
    "team": "Code Cuisine ",
    "verified": true,
    "refNo": "KR-2025-633",
    "type": "Participation"
  },
  "DLG/HO25/PART/510": {
    "name": "Hiral Goyal",
    "team": "The nexus pioneers",
    "verified": true,
    "refNo": "KR-2025-634",
    "type": "Participation"
  },
  "DLG/HO25/PART/701": {
    "name": "Arpita Soni",
    "team": "Aquasync",
    "verified": true,
    "refNo": "KR-2025-635",
    "type": "Participation"
  },
  "DLG/HO25/PART/511": {
    "name": "PRASENJIT SAHA",
    "team": "404_FOUND",
    "verified": true,
    "refNo": "KR-2025-636",
    "type": "Participation"
  },
  "DLG/HO25/PART/582": {
    "name": "Rupam Betal",
    "team": "Intellicore ",
    "verified": true,
    "refNo": "KR-2025-637",
    "type": "Participation"
  },
  "DLG/HO25/PART/512": {
    "name": "HIFZA MOHAMMEDI",
    "team": "GHOST LAYER",
    "verified": true,
    "refNo": "KR-2025-638",
    "type": "Participation"
  },
  "DLG/HO25/PART/583": {
    "name": "ARYA JAIN",
    "team": "TECH NOVA",
    "verified": true,
    "refNo": "KR-2025-639",
    "type": "Participation"
  },
  "DLG/HO25/PART/696": {
    "name": "Akash Dupathi",
    "team": "Byte Bandits",
    "verified": true,
    "refNo": "KR-2025-640",
    "type": "Participation"
  },
  "DLG/HO25/PART/584": {
    "name": "SAKET DUBEY",
    "team": "CODEFATHER",
    "verified": true,
    "refNo": "KR-2025-641",
    "type": "Participation"
  },
  "DLG/HO25/PART/513": {
    "name": "Ujwal Mishra",
    "team": "Bug Busters",
    "verified": true,
    "refNo": "KR-2025-642",
    "type": "Participation"
  },
  "DLG/HO25/PART/514": {
    "name": "MOHAMMED MISBAH ",
    "team": "Coderzz ",
    "verified": true,
    "refNo": "KR-2025-643",
    "type": "Participation"
  },
  "DLG/HO25/PART/585": {
    "name": "TEJASVA GUPTA",
    "team": "AART-ist ",
    "verified": true,
    "refNo": "KR-2025-644",
    "type": "Participation"
  },
  "DLG/HO25/PART/586": {
    "name": "Sanjana Sanodiya",
    "team": "Mavericks",
    "verified": true,
    "refNo": "KR-2025-645",
    "type": "Participation"
  },
  "DLG/HO25/PART/515": {
    "name": "MOKSHA BHAYANI ",
    "team": "ChainPass Innovators",
    "verified": true,
    "refNo": "KR-2025-646",
    "type": "Participation"
  },
  "DLG/HO25/PART/516": {
    "name": "Sejal Mahajan",
    "team": "Neural Ninjas",
    "verified": true,
    "refNo": "KR-2025-647",
    "type": "Participation"
  },
  "DLG/HO25/PART/587": {
    "name": "Koushik Pali",
    "team": "Farm2Market",
    "verified": true,
    "refNo": "KR-2025-648",
    "type": "Participation"
  },
  "DLG/HO25/PART/517": {
    "name": "GUGULOTHU PRANAYASHEELA",
    "team": "Code Catalyst ",
    "verified": true,
    "refNo": "KR-2025-649",
    "type": "Participation"
  },
  "DLG/HO25/PART/588": {
    "name": "Tanvi Shivaji Kumbhar",
    "team": "CodeCraft",
    "verified": true,
    "refNo": "KR-2025-650",
    "type": "Participation"
  },
  "DLG/HO25/PART/589": {
    "name": "PRINCE GAUTAM",
    "team": "Alpha001",
    "verified": true,
    "refNo": "KR-2025-651",
    "type": "Participation"
  },
  "DLG/HO25/PART/590": {
    "name": "K S Shravani",
    "team": "KADS",
    "verified": true,
    "refNo": "KR-2025-652",
    "type": "Participation"
  },
  "DLG/HO25/PART/591": {
    "name": "Tanaya Jain",
    "team": "Stranger Strings",
    "verified": true,
    "refNo": "KR-2025-653",
    "type": "Participation"
  },
  "DLG/HO25/PART/592": {
    "name": "Divyansh Singh",
    "team": "Tech Heroes ",
    "verified": true,
    "refNo": "KR-2025-654",
    "type": "Participation"
  },
  "DLG/HO25/PART/593": {
    "name": "Khushi Mangal",
    "team": "DaRKTech",
    "verified": true,
    "refNo": "KR-2025-655",
    "type": "Participation"
  },
  "DLG/HO25/PART/594": {
    "name": "Manas Chintalapudi",
    "team": "AGENTOS",
    "verified": true,
    "refNo": "KR-2025-656",
    "type": "Participation"
  },
  "DLG/HO25/PART/595": {
    "name": "Shubham kushwaha",
    "team": "Semicolon;",
    "verified": true,
    "refNo": "KR-2025-657",
    "type": "Participation"
  },
  "DLG/HO25/PART/596": {
    "name": "Rakshit Raj",
    "team": "TARminators",
    "verified": true,
    "refNo": "KR-2025-658",
    "type": "Participation"
  },
  "DLG/HO25/PART/518": {
    "name": "Fatima Hasan",
    "team": "Apex Pioneers",
    "verified": true,
    "refNo": "KR-2025-659",
    "type": "Participation"
  },
  "DLG/HO25/PART/597": {
    "name": "Supriya Soni",
    "team": "Vibe Coders",
    "verified": true,
    "refNo": "KR-2025-660",
    "type": "Participation"
  },
  "DLG/HO25/PART/519": {
    "name": "Aarjav Jain",
    "team": "Bug_Busters",
    "verified": true,
    "refNo": "KR-2025-661",
    "type": "Participation"
  },
  "DLG/HO25/PART/598": {
    "name": "Prem Rohidas Patil",
    "team": "Pixel Pirates",
    "verified": true,
    "refNo": "KR-2025-662",
    "type": "Participation"
  },
  "DLG/HO25/PART/599": {
    "name": "Shree Hari S.L",
    "team": "TechX",
    "verified": true,
    "refNo": "KR-2025-663",
    "type": "Participation"
  },
  "DLG/HO25/PART/600": {
    "name": "Prerna Pandey",
    "team": "TechRx",
    "verified": true,
    "refNo": "KR-2025-664",
    "type": "Participation"
  },
  "DLG/HO25/PART/601": {
    "name": "Inderpreet Kaur",
    "team": "Code marvels",
    "verified": true,
    "refNo": "KR-2025-665",
    "type": "Participation"
  },
  "DLG/HO25/PART/602": {
    "name": "Anuraj Paul",
    "team": "V-OHm",
    "verified": true,
    "refNo": "KR-2025-666",
    "type": "Participation"
  },
  "DLG/HO25/PART/603": {
    "name": "SARABJEET SINGH",
    "team": "TEAM 420",
    "verified": true,
    "refNo": "KR-2025-667",
    "type": "Participation"
  },
  "DLG/HO25/PART/604": {
    "name": "Anuj Kumar",
    "team": "HackStreet BOYS ",
    "verified": true,
    "refNo": "KR-2025-668",
    "type": "Participation"
  },
  "DLG/HO25/PART/709": {
    "name": "KULWINDER SINGH",
    "team": "NeuroNovas ",
    "verified": true,
    "refNo": "KR-2025-669",
    "type": "Participation"
  },
  "DLG/HO25/PART/712": {
    "name": "PARIHAR RITHIN RAJPOOT",
    "team": "EliteX",
    "verified": true,
    "refNo": "KR-2025-670",
    "type": "Participation"
  },
  "DLG/HO25/PART/718": {
    "name": "SARTHAK BHADOURIYA",
    "team": "CLAUSEWISE",
    "verified": true,
    "refNo": "KR-2025-671",
    "type": "Participation"
  },
  "DLG/HO25/PART/721": {
    "name": "Pratik Prashant Mulay",
    "team": "Trinity Minds ",
    "verified": true,
    "refNo": "KR-2025-672",
    "type": "Participation"
  },
  "DLG/HO25/PART/724": {
    "name": "MUTHYALA YAKSHANYAI ",
    "team": "HackBros",
    "verified": true,
    "refNo": "KR-2025-673",
    "type": "Participation"
  },
  "DLG/HO25/PART/851": {
    "name": "Drishti Kaushik",
    "team": "OrbitalCracks",
    "verified": true,
    "refNo": "KR-2025-674",
    "type": "Participation"
  },
  "DLG/HO25/PART/732": {
    "name": "ANKITA BISWAS",
    "team": "CosmoX",
    "verified": true,
    "refNo": "KR-2025-675",
    "type": "Participation"
  },
  "DLG/HO25/PART/735": {
    "name": "Raunav Yadav",
    "team": "Operators ",
    "verified": true,
    "refNo": "KR-2025-676",
    "type": "Participation"
  },
  "DLG/HO25/PART/738": {
    "name": "J.Leena Sai Sri",
    "team": "Innovators ",
    "verified": true,
    "refNo": "KR-2025-677",
    "type": "Participation"
  },
  "DLG/HO25/PART/740": {
    "name": "SUMIT KUMAR SHARMA",
    "team": "Tech Med-Aid",
    "verified": true,
    "refNo": "KR-2025-678",
    "type": "Participation"
  },
  "DLG/HO25/PART/744": {
    "name": "Kanka",
    "team": "BixWhizCrew",
    "verified": true,
    "refNo": "KR-2025-679",
    "type": "Participation"
  },
  "DLG/HO25/PART/748": {
    "name": "Rabi Narayan Das",
    "team": "HacknoTricks",
    "verified": true,
    "refNo": "KR-2025-680",
    "type": "Participation"
  },
  "DLG/HO25/PART/751": {
    "name": "ADITYA RAWAT",
    "team": "CODE PIRATES ",
    "verified": true,
    "refNo": "KR-2025-681",
    "type": "Participation"
  },
  "DLG/HO25/PART/754": {
    "name": "SUJAL WAGH",
    "team": "Tech-Mates",
    "verified": true,
    "refNo": "KR-2025-682",
    "type": "Participation"
  },
  "DLG/HO25/PART/757": {
    "name": "Kushboo Chaudhary",
    "team": "Samadhan",
    "verified": true,
    "refNo": "KR-2025-683",
    "type": "Participation"
  },
  "DLG/HO25/PART/759": {
    "name": "Sameer Kulkarni",
    "team": "TEAM SPARKLE",
    "verified": true,
    "refNo": "KR-2025-684",
    "type": "Participation"
  },
  "DLG/HO25/PART/762": {
    "name": "S.ARCHANA",
    "team": "AI MAVERICKS ",
    "verified": true,
    "refNo": "KR-2025-685",
    "type": "Participation"
  },
  "DLG/HO25/PART/765": {
    "name": "Annapurna Pandey",
    "team": "COCOCODES",
    "verified": true,
    "refNo": "KR-2025-686",
    "type": "Participation"
  },
  "DLG/HO25/PART/768": {
    "name": "Thangallapalli Arunkumar",
    "team": "IRAVOLT ",
    "verified": true,
    "refNo": "KR-2025-687",
    "type": "Participation"
  },
  "DLG/HO25/PART/772": {
    "name": "VAISHNAVI BHATELE",
    "team": "Civic code ",
    "verified": true,
    "refNo": "KR-2025-688",
    "type": "Participation"
  },
  "DLG/HO25/PART/775": {
    "name": "CHITTURI RUPESH",
    "team": "K4-SpiritCourage",
    "verified": true,
    "refNo": "KR-2025-689",
    "type": "Participation"
  },
  "DLG/HO25/PART/778": {
    "name": "VIVEK UPADHYAY",
    "team": "Hack4Good",
    "verified": true,
    "refNo": "KR-2025-690",
    "type": "Participation"
  },
  "DLG/HO25/PART/781": {
    "name": "Janhavi Gangadhar Kundgir",
    "team": "Team White Ravens",
    "verified": true,
    "refNo": "KR-2025-691",
    "type": "Participation"
  },
  "DLG/HO25/PART/787": {
    "name": "ADHYATMA SINGH CHAUHAN",
    "team": "TechDrifters",
    "verified": true,
    "refNo": "KR-2025-692",
    "type": "Participation"
  },
  "DLG/HO25/PART/789": {
    "name": "DARVISH YADAV DEGA",
    "team": "Kurukshetra",
    "verified": true,
    "refNo": "KR-2025-693",
    "type": "Participation"
  },
  "DLG/HO25/PART/792": {
    "name": "Vibhu Vishwakarma",
    "team": "Hells_chain",
    "verified": true,
    "refNo": "KR-2025-694",
    "type": "Participation"
  },
  "DLG/HO25/PART/795": {
    "name": "R Aishwarya",
    "team": "Quantum Sparks ",
    "verified": true,
    "refNo": "KR-2025-695",
    "type": "Participation"
  },
  "DLG/HO25/PART/797": {
    "name": "Muskan Kumari",
    "team": "NextGen Hackers",
    "verified": true,
    "refNo": "KR-2025-696",
    "type": "Participation"
  },
  "DLG/HO25/PART/799": {
    "name": "Tanishq Verma",
    "team": "Code Bandits",
    "verified": true,
    "refNo": "KR-2025-697",
    "type": "Participation"
  },
  "DLG/HO25/PART/802": {
    "name": "Palak Dubey ",
    "team": "Kangaroo ",
    "verified": true,
    "refNo": "KR-2025-698",
    "type": "Participation"
  },
  "DLG/HO25/PART/804": {
    "name": "Harshita Jain",
    "team": "Orbit",
    "verified": true,
    "refNo": "KR-2025-699",
    "type": "Participation"
  },
  "DLG/HO25/PART/807": {
    "name": "PALAK GUPTA",
    "team": "THE FIXERS",
    "verified": true,
    "refNo": "KR-2025-700",
    "type": "Participation"
  },
  "DLG/HO25/PART/810": {
    "name": "Varad Devendra Kulkarni",
    "team": "Neural Ninjas",
    "verified": true,
    "refNo": "KR-2025-701",
    "type": "Participation"
  },
  "DLG/HO25/PART/814": {
    "name": "Tanushka Tomar",
    "team": "The Originals",
    "verified": true,
    "refNo": "KR-2025-702",
    "type": "Participation"
  },
  "DLG/HO25/PART/818": {
    "name": "Aniket Joshi",
    "team": "Tech Titans",
    "verified": true,
    "refNo": "KR-2025-703",
    "type": "Participation"
  },
  "DLG/HO25/PART/822": {
    "name": "Ankit Singh",
    "team": "Apostles",
    "verified": true,
    "refNo": "KR-2025-704",
    "type": "Participation"
  },
  "DLG/HO25/PART/827": {
    "name": "Pragya",
    "team": "yashanpreet41",
    "verified": true,
    "refNo": "KR-2025-705",
    "type": "Participation"
  },
  "DLG/HO25/PART/831": {
    "name": "Nikhil Kadam",
    "team": "HackNova ",
    "verified": true,
    "refNo": "KR-2025-706",
    "type": "Participation"
  },
  "DLG/HO25/PART/834": {
    "name": "Bhavana. B",
    "team": "Quadcore",
    "verified": true,
    "refNo": "KR-2025-707",
    "type": "Participation"
  },
  "DLG/HO25/PART/837": {
    "name": "RISHABH UKE",
    "team": "Aura",
    "verified": true,
    "refNo": "KR-2025-708",
    "type": "Participation"
  },
  "DLG/HO25/PART/605": {
    "name": "Khushal Tarachand Jangid",
    "team": " ErrorVerse ",
    "verified": true,
    "refNo": "KR-2025-709",
    "type": "Participation"
  },
  "DLG/HO25/PART/606": {
    "name": "Sunidhi Kumari",
    "team": "     TrackTroop",
    "verified": true,
    "refNo": "KR-2025-710",
    "type": "Participation"
  },
  "DLG/HO25/PART/846": {
    "name": "Paarth Mahadik",
    "team": "InnovateX",
    "verified": true,
    "refNo": "KR-2025-711",
    "type": "Participation"
  },
  "DLG/HO25/PART/607": {
    "name": "JAYESH KAPOOR",
    "team": "CORBETT",
    "verified": true,
    "refNo": "KR-2025-712",
    "type": "Participation"
  },
  "DLG/HO25/PART/608": {
    "name": "Priya",
    "team": "Mind bridge ",
    "verified": true,
    "refNo": "KR-2025-713",
    "type": "Participation"
  },
  "DLG/HO25/PART/609": {
    "name": "TARUN KUMAR MEHARDA",
    "team": "Code Craft",
    "verified": true,
    "refNo": "KR-2025-714",
    "type": "Participation"
  },
  "DLG/HO25/PART/610": {
    "name": "Saransh Parihar",
    "team": "HPjunios",
    "verified": true,
    "refNo": "KR-2025-715",
    "type": "Participation"
  },
  "DLG/HO25/PART/611": {
    "name": "Garv Gupta",
    "team": "TechBrix",
    "verified": true,
    "refNo": "KR-2025-716",
    "type": "Participation"
  },
  "DLG/HO25/PART/612": {
    "name": "Pradeep Kumar",
    "team": "Operators ",
    "verified": true,
    "refNo": "KR-2025-717",
    "type": "Participation"
  },
  "DLG/HO25/PART/613": {
    "name": "Snigdha Talasila",
    "team": "WE",
    "verified": true,
    "refNo": "KR-2025-718",
    "type": "Participation"
  },
  "DLG/HO25/PART/614": {
    "name": "Manees Kumar T",
    "team": "Tech devils",
    "verified": true,
    "refNo": "KR-2025-719",
    "type": "Participation"
  },
  "DLG/HO25/PART/615": {
    "name": "Aradhya Avhad",
    "team": "Declutters",
    "verified": true,
    "refNo": "KR-2025-720",
    "type": "Participation"
  },
  "DLG/HO25/PART/616": {
    "name": "Gourav Soni",
    "team": "Recruitech",
    "verified": true,
    "refNo": "KR-2025-721",
    "type": "Participation"
  },
  "DLG/HO25/PART/617": {
    "name": "Damasani nagasathvik",
    "team": "Team Nexus",
    "verified": true,
    "refNo": "KR-2025-722",
    "type": "Participation"
  },
  "DLG/HO25/PART/618": {
    "name": "SAMRUDDHI BAJPAYEE",
    "team": "SyncSparks",
    "verified": true,
    "refNo": "KR-2025-723",
    "type": "Participation"
  },
  "DLG/HO25/PART/619": {
    "name": "Preksha Pethakar",
    "team": "BIT-DEFENDERS",
    "verified": true,
    "refNo": "KR-2025-724",
    "type": "Participation"
  },
  "DLG/HO25/PART/620": {
    "name": "Parv Agrawal",
    "team": "BINARY BEASTS",
    "verified": true,
    "refNo": "KR-2025-725",
    "type": "Participation"
  },
  "DLG/HO25/PART/621": {
    "name": "ADISH JAIN",
    "team": "Webwizards",
    "verified": true,
    "refNo": "KR-2025-726",
    "type": "Participation"
  },
  "DLG/HO25/PART/622": {
    "name": "Om Vashudev Singh Shekhawat",
    "team": "Team Aarambh ",
    "verified": true,
    "refNo": "KR-2025-727",
    "type": "Participation"
  },
  "DLG/HO25/PART/623": {
    "name": "Shivang Yadav",
    "team": "NextGen MedTech",
    "verified": true,
    "refNo": "KR-2025-728",
    "type": "Participation"
  },
  "DLG/HO25/PART/624": {
    "name": "Satyam Tiwari",
    "team": "Team Green Guardians",
    "verified": true,
    "refNo": "KR-2025-729",
    "type": "Participation"
  },
  "DLG/HO25/PART/847": {
    "name": "Kaviyashree.P",
    "team": "Team- OrbitOps",
    "verified": true,
    "refNo": "KR-2025-730",
    "type": "Participation"
  },
  "DLG/HO25/PART/625": {
    "name": "DIYA RAO",
    "team": "Data Miners (AI-luminati)",
    "verified": true,
    "refNo": "KR-2025-731",
    "type": "Participation"
  },
  "DLG/HO25/PART/626": {
    "name": "Neha P S",
    "team": "Ideanova",
    "verified": true,
    "refNo": "KR-2025-732",
    "type": "Participation"
  },
  "DLG/HO25/PART/627": {
    "name": "SHIVANSH MISHRA",
    "team": "NeXus AI",
    "verified": true,
    "refNo": "KR-2025-733",
    "type": "Participation"
  },
  "DLG/HO25/PART/707": {
    "name": "Omkar Katare",
    "team": "Error 404:: Not found",
    "verified": true,
    "refNo": "KR-2025-734",
    "type": "Participation"
  },
  "DLG/HO25/PART/628": {
    "name": "Shreya Zutshi",
    "team": "EXCALLION",
    "verified": true,
    "refNo": "KR-2025-735",
    "type": "Participation"
  },
  "DLG/HO25/PART/629": {
    "name": "Shree Dharshan S",
    "team": "Bytebash",
    "verified": true,
    "refNo": "KR-2025-736",
    "type": "Participation"
  },
  "DLG/HO25/PART/630": {
    "name": "Rishi Mahesh Dadhich",
    "team": "Nexora",
    "verified": true,
    "refNo": "KR-2025-737",
    "type": "Participation"
  },
  "DLG/HO25/PART/631": {
    "name": "Sweta Raj",
    "team": "Psychic Coders",
    "verified": true,
    "refNo": "KR-2025-738",
    "type": "Participation"
  },
  "DLG/HO25/PART/632": {
    "name": "Nallamothu Bhavya Sri",
    "team": "Hacknova",
    "verified": true,
    "refNo": "KR-2025-739",
    "type": "Participation"
  },
  "DLG/HO25/PART/633": {
    "name": "Prakshit Suthar",
    "team": "Trinity.Codes",
    "verified": true,
    "refNo": "KR-2025-740",
    "type": "Participation"
  },
  "DLG/HO25/PART/634": {
    "name": "Pratham Sinha",
    "team": "Dead Code",
    "verified": true,
    "refNo": "KR-2025-741",
    "type": "Participation"
  },
  "DLG/HO25/PART/635": {
    "name": "SWASTIKA RAJAK",
    "team": "FinAvengers ",
    "verified": true,
    "refNo": "KR-2025-742",
    "type": "Participation"
  },
  "DLG/HO25/PART/636": {
    "name": "Ashika jain",
    "team": "Neural Ninjas",
    "verified": true,
    "refNo": "KR-2025-743",
    "type": "Participation"
  },
  "DLG/HO25/PART/637": {
    "name": "ULRIC COLLACO",
    "team": "Techtruction ",
    "verified": true,
    "refNo": "KR-2025-744",
    "type": "Participation"
  },
  "DLG/HO25/PART/699": {
    "name": "Praveen Birla",
    "team": "Room 104",
    "verified": true,
    "refNo": "KR-2025-745",
    "type": "Participation"
  },
  "DLG/HO25/PART/638": {
    "name": "MANAV JAIN",
    "team": "ResQTech ",
    "verified": true,
    "refNo": "KR-2025-746",
    "type": "Participation"
  },
  "DLG/HO25/PART/639": {
    "name": "Payal Rathor",
    "team": "StellarSync5.O",
    "verified": true,
    "refNo": "KR-2025-747",
    "type": "Participation"
  },
  "DLG/HO25/PART/640": {
    "name": "Sumit Thakur",
    "team": "Normally Distributed",
    "verified": true,
    "refNo": "KR-2025-748",
    "type": "Participation"
  },
  "DLG/HO25/PART/641": {
    "name": "AMRIT TEHALANI",
    "team": "System32",
    "verified": true,
    "refNo": "KR-2025-749",
    "type": "Participation"
  },
  "DLG/HO25/PART/642": {
    "name": "B RAJA VARDHAN",
    "team": "SYNTAX SQUAD",
    "verified": true,
    "refNo": "KR-2025-750",
    "type": "Participation"
  },
  "DLG/HO25/PART/643": {
    "name": "Pooja Wanjare",
    "team": "Code Mavericks",
    "verified": true,
    "refNo": "KR-2025-751",
    "type": "Participation"
  },
  "DLG/HO25/PART/644": {
    "name": "Kalasapati Rupa Lakshmi",
    "team": "Code Hunters",
    "verified": true,
    "refNo": "KR-2025-752",
    "type": "Participation"
  },
  "DLG/HO25/PART/645": {
    "name": "HARSHITA SONI",
    "team": "Code Thrust ",
    "verified": true,
    "refNo": "KR-2025-753",
    "type": "Participation"
  },
  "DLG/HO25/PART/646": {
    "name": "MODHURIIMA TALUKDAR",
    "team": "Fireflies",
    "verified": true,
    "refNo": "KR-2025-754",
    "type": "Participation"
  },
  "DLG/HO25/PART/647": {
    "name": "ROSHAN CHANDRAKER",
    "team": "HACKBOTS",
    "verified": true,
    "refNo": "KR-2025-755",
    "type": "Participation"
  },
  "DLG/HO25/PART/648": {
    "name": "Abhay Bhadoriya",
    "team": "Team Byte Benders",
    "verified": true,
    "refNo": "KR-2025-756",
    "type": "Participation"
  },
  "DLG/HO25/PART/649": {
    "name": "Shaunak Hawaldar",
    "team": "Neuromatics ",
    "verified": true,
    "refNo": "KR-2025-757",
    "type": "Participation"
  },
  "DLG/HO25/PART/650": {
    "name": "Sejal Saraf",
    "team": "Central Syntax ",
    "verified": true,
    "refNo": "KR-2025-758",
    "type": "Participation"
  },
  "DLG/HO25/PART/651": {
    "name": "Himanshu Ranglani",
    "team": "404 Found Us",
    "verified": true,
    "refNo": "KR-2025-759",
    "type": "Participation"
  },
  "DLG/HO25/PART/652": {
    "name": "Aniket Raj",
    "team": "Tensor Titans",
    "verified": true,
    "refNo": "KR-2025-760",
    "type": "Participation"
  },
  "DLG/HO25/PART/653": {
    "name": "ROHIT AHIRWAR",
    "team": "AvenCode",
    "verified": true,
    "refNo": "KR-2025-761",
    "type": "Participation"
  },
  "DLG/HO25/PART/654": {
    "name": "Shreyansh Patel Alpeshkumar",
    "team": "PitchPerfect",
    "verified": true,
    "refNo": "KR-2025-762",
    "type": "Participation"
  },
  "DLG/HO25/PART/656": {
    "name": "JatinderPal Singh Sidhu",
    "team": "FreshForge",
    "verified": true,
    "refNo": "KR-2025-763",
    "type": "Participation"
  },
  "DLG/HO25/PART/657": {
    "name": "Navya Shrivastava",
    "team": "Greenbridge ",
    "verified": true,
    "refNo": "KR-2025-764",
    "type": "Participation"
  },
  "DLG/HO25/PART/658": {
    "name": "Mohd Adnan sami",
    "team": "Waghnakhs",
    "verified": true,
    "refNo": "KR-2025-765",
    "type": "Participation"
  },
  "DLG/HO25/PART/659": {
    "name": "HARIKRISHNAN J",
    "team": "HAPS",
    "verified": true,
    "refNo": "KR-2025-766",
    "type": "Participation"
  },
  "DLG/HO25/PART/660": {
    "name": "Akshjeet Singh Solanki",
    "team": "THE SQUAD",
    "verified": true,
    "refNo": "KR-2025-767",
    "type": "Participation"
  },
  "DLG/HO25/PART/848": {
    "name": "Rishi Sai V",
    "team": "HACKATHON HUSTLERS",
    "verified": true,
    "refNo": "KR-2025-768",
    "type": "Participation"
  },
  "DLG/HO25/PART/661": {
    "name": "SNEHA KUNDU",
    "team": "404 NOT FOUND",
    "verified": true,
    "refNo": "KR-2025-769",
    "type": "Participation"
  },
  "DLG/HO25/PART/662": {
    "name": "D NAVYA SRI",
    "team": "Codekshatriya",
    "verified": true,
    "refNo": "KR-2025-770",
    "type": "Participation"
  },
  "DLG/HO25/PART/663": {
    "name": "Riddhi Narendra Jangale",
    "team": "QuadraCodes",
    "verified": true,
    "refNo": "KR-2025-771",
    "type": "Participation"
  },
  "DLG/HO25/PART/664": {
    "name": "Simran Maurya",
    "team": "Terminal Tribe ",
    "verified": true,
    "refNo": "KR-2025-772",
    "type": "Participation"
  },
  "DLG/HO25/PART/665": {
    "name": "Adarsh Mishra",
    "team": "FireSentinel ",
    "verified": true,
    "refNo": "KR-2025-773",
    "type": "Participation"
  },
  "DLG/HO25/PART/666": {
    "name": "Sagar Maheshwari",
    "team": "404NotFound ",
    "verified": true,
    "refNo": "KR-2025-774",
    "type": "Participation"
  },
  "DLG/HO25/PART/702": {
    "name": "Asmita Soni",
    "team": "Aquasync",
    "verified": true,
    "refNo": "KR-2025-775",
    "type": "Participation"
  },
  "DLG/HO25/PART/667": {
    "name": "Rishita Baranwal",
    "team": "Intellicore ",
    "verified": true,
    "refNo": "KR-2025-776",
    "type": "Participation"
  },
  "DLG/HO25/PART/668": {
    "name": "NEHAL SHARMA",
    "team": "TECH NOVA",
    "verified": true,
    "refNo": "KR-2025-777",
    "type": "Participation"
  },
  "DLG/HO25/PART/669": {
    "name": "LUCKY KUMAR",
    "team": "CODEFATHER",
    "verified": true,
    "refNo": "KR-2025-778",
    "type": "Participation"
  },
  "DLG/HO25/PART/670": {
    "name": "ANMOL SONI",
    "team": "AART-ist ",
    "verified": true,
    "refNo": "KR-2025-779",
    "type": "Participation"
  },
  "DLG/HO25/PART/671": {
    "name": "Najeeb Farhan Mazumder",
    "team": "Mavericks",
    "verified": true,
    "refNo": "KR-2025-780",
    "type": "Participation"
  },
  "DLG/HO25/PART/672": {
    "name": "Devansh Patel",
    "team": "Farm2Market",
    "verified": true,
    "refNo": "KR-2025-781",
    "type": "Participation"
  },
  "DLG/HO25/PART/673": {
    "name": "Rohit Chandrakant Karande",
    "team": "CodeCraft",
    "verified": true,
    "refNo": "KR-2025-782",
    "type": "Participation"
  },
  "DLG/HO25/PART/674": {
    "name": "MANOJ LODHI",
    "team": "Alpha001",
    "verified": true,
    "refNo": "KR-2025-783",
    "type": "Participation"
  },
  "DLG/HO25/PART/675": {
    "name": "Darshan Durgada",
    "team": "KADS",
    "verified": true,
    "refNo": "KR-2025-784",
    "type": "Participation"
  },
  "DLG/HO25/PART/676": {
    "name": "Arnav Chaudhary",
    "team": "Stranger Strings",
    "verified": true,
    "refNo": "KR-2025-785",
    "type": "Participation"
  },
  "DLG/HO25/PART/677": {
    "name": "Rana Pratap Singh",
    "team": "Tech Heroes ",
    "verified": true,
    "refNo": "KR-2025-786",
    "type": "Participation"
  },
  "DLG/HO25/PART/678": {
    "name": "Ritik Rathod",
    "team": "DaRKTech",
    "verified": true,
    "refNo": "KR-2025-787",
    "type": "Participation"
  },
  "DLG/HO25/PART/679": {
    "name": "Mitta Vinay Krishna Reddy",
    "team": "AGENTOS",
    "verified": true,
    "refNo": "KR-2025-788",
    "type": "Participation"
  },
  "DLG/HO25/PART/680": {
    "name": "Gaurav parmar",
    "team": "Semicolon;",
    "verified": true,
    "refNo": "KR-2025-789",
    "type": "Participation"
  },
  "DLG/HO25/PART/681": {
    "name": "Ayush Anand",
    "team": "TARminators",
    "verified": true,
    "refNo": "KR-2025-790",
    "type": "Participation"
  },
  "DLG/HO25/PART/682": {
    "name": "Arohi Wakankar",
    "team": "Vibe Coders",
    "verified": true,
    "refNo": "KR-2025-791",
    "type": "Participation"
  },
  "DLG/HO25/PART/683": {
    "name": "Kalpesh Dnyaneshwar Patil",
    "team": "Pixel Pirates",
    "verified": true,
    "refNo": "KR-2025-792",
    "type": "Participation"
  },
  "DLG/HO25/PART/684": {
    "name": "Yasvanthini T",
    "team": "TechX",
    "verified": true,
    "refNo": "KR-2025-793",
    "type": "Participation"
  },
  "DLG/HO25/PART/685": {
    "name": "Priyal Saxena",
    "team": "TechRx",
    "verified": true,
    "refNo": "KR-2025-794",
    "type": "Participation"
  },
  "DLG/HO25/PART/686": {
    "name": "Chitrabhanu Srivastava",
    "team": "Code marvels",
    "verified": true,
    "refNo": "KR-2025-795",
    "type": "Participation"
  },
  "DLG/HO25/PART/687": {
    "name": "Kaushik Rajkhowa",
    "team": "V-OHm",
    "verified": true,
    "refNo": "KR-2025-796",
    "type": "Participation"
  },
  "DLG/HO25/PART/688": {
    "name": "SHREYASH PANDEY",
    "team": "TEAM 420",
    "verified": true,
    "refNo": "KR-2025-797",
    "type": "Participation"
  },
  "DLG/HO25/PART/689": {
    "name": "Anish Malaiya",
    "team": "HackStreet BOYS ",
    "verified": true,
    "refNo": "KR-2025-798",
    "type": "Participation"
  },
  "DLG/HO25/PART/710": {
    "name": "MILLEE MITTAL ",
    "team": "NeuroNovas ",
    "verified": true,
    "refNo": "KR-2025-799",
    "type": "Participation"
  },
  "DLG/HO25/PART/713": {
    "name": "PISKE MADHU",
    "team": "EliteX",
    "verified": true,
    "refNo": "KR-2025-800",
    "type": "Participation"
  },
  "DLG/HO25/PART/719": {
    "name": "PARUL AGRAWAL",
    "team": "CLAUSEWISE",
    "verified": true,
    "refNo": "KR-2025-801",
    "type": "Participation"
  },
  "DLG/HO25/PART/722": {
    "name": "Jayraj Vilas Khule",
    "team": "Trinity Minds ",
    "verified": true,
    "refNo": "KR-2025-802",
    "type": "Participation"
  },
  "DLG/HO25/PART/733": {
    "name": "ASHWANI KUMAR ",
    "team": "CosmoX",
    "verified": true,
    "refNo": "KR-2025-803",
    "type": "Participation"
  },
  "DLG/HO25/PART/736": {
    "name": "Pradeep Kumar",
    "team": "Operators ",
    "verified": true,
    "refNo": "KR-2025-804",
    "type": "Participation"
  },
  "DLG/HO25/PART/741": {
    "name": " PARIKSHIT SHARMA ",
    "team": "Tech Med-Aid",
    "verified": true,
    "refNo": "KR-2025-805",
    "type": "Participation"
  },
  "DLG/HO25/PART/745": {
    "name": "Lavanya Yadav",
    "team": "BixWhizCrew",
    "verified": true,
    "refNo": "KR-2025-806",
    "type": "Participation"
  },
  "DLG/HO25/PART/749": {
    "name": "Pratik Mohanty",
    "team": "HacknoTricks",
    "verified": true,
    "refNo": "KR-2025-807",
    "type": "Participation"
  },
  "DLG/HO25/PART/752": {
    "name": "HARSH VARDHAN SINGH BAIS ",
    "team": "CODE PIRATES ",
    "verified": true,
    "refNo": "KR-2025-808",
    "type": "Participation"
  },
  "DLG/HO25/PART/760": {
    "name": "Miheer Shinde",
    "team": "TEAM SPARKLE",
    "verified": true,
    "refNo": "KR-2025-809",
    "type": "Participation"
  },
  "DLG/HO25/PART/766": {
    "name": "Dhruv Saxena",
    "team": "COCOCODES",
    "verified": true,
    "refNo": "KR-2025-810",
    "type": "Participation"
  },
  "DLG/HO25/PART/769": {
    "name": "Pikilenka shashi kiran",
    "team": "IRAVOLT ",
    "verified": true,
    "refNo": "KR-2025-811",
    "type": "Participation"
  },
  "DLG/HO25/PART/773": {
    "name": "UTKARAH PACHOURI",
    "team": "Civic code ",
    "verified": true,
    "refNo": "KR-2025-812",
    "type": "Participation"
  },
  "DLG/HO25/PART/776": {
    "name": "KOPPARTHI HEMA VARDHAN",
    "team": "K4-SpiritCourage",
    "verified": true,
    "refNo": "KR-2025-813",
    "type": "Participation"
  },
  "DLG/HO25/PART/779": {
    "name": "URVESH SHEKHAWAT",
    "team": "Hack4Good",
    "verified": true,
    "refNo": "KR-2025-814",
    "type": "Participation"
  },
  "DLG/HO25/PART/782": {
    "name": "Snehal Prabodh Kulkarni ",
    "team": "Team White Ravens",
    "verified": true,
    "refNo": "KR-2025-815",
    "type": "Participation"
  },
  "DLG/HO25/PART/790": {
    "name": "SAI TEJA THAMMALI",
    "team": "Kurukshetra",
    "verified": true,
    "refNo": "KR-2025-816",
    "type": "Participation"
  },
  "DLG/HO25/PART/793": {
    "name": "Vinayak Suthar",
    "team": "Hells_chain",
    "verified": true,
    "refNo": "KR-2025-817",
    "type": "Participation"
  },
  "DLG/HO25/PART/849": {
    "name": "Neehit Kumar ",
    "team": "NextGen Hackers",
    "verified": true,
    "refNo": "KR-2025-818",
    "type": "Participation"
  },
  "DLG/HO25/PART/800": {
    "name": "Diya Panjwani",
    "team": "Code Bandits",
    "verified": true,
    "refNo": "KR-2025-819",
    "type": "Participation"
  },
  "DLG/HO25/PART/805": {
    "name": "Sukhman Arora",
    "team": "Orbit",
    "verified": true,
    "refNo": "KR-2025-820",
    "type": "Participation"
  },
  "DLG/HO25/PART/808": {
    "name": "RAGINI YADAV",
    "team": "THE FIXERS",
    "verified": true,
    "refNo": "KR-2025-821",
    "type": "Participation"
  },
  "DLG/HO25/PART/811": {
    "name": "Omkar Ankush Dhembare",
    "team": "Neural Ninjas",
    "verified": true,
    "refNo": "KR-2025-822",
    "type": "Participation"
  },
  "DLG/HO25/PART/815": {
    "name": "Purnima Parihar",
    "team": "The Originals",
    "verified": true,
    "refNo": "KR-2025-823",
    "type": "Participation"
  },
  "DLG/HO25/PART/850": {
    "name": "Soumy Agarwal ",
    "team": "Apostles",
    "verified": true,
    "refNo": "KR-2025-824",
    "type": "Participation"
  },
  "DLG/HO25/PART/828": {
    "name": "Jatin Gupta",
    "team": "yashanpreet41",
    "verified": true,
    "refNo": "KR-2025-825",
    "type": "Participation"
  },
  "DLG/HO25/PART/832": {
    "name": "Sanket Patil",
    "team": "HackNova ",
    "verified": true,
    "refNo": "KR-2025-826",
    "type": "Participation"
  },
  "DLG/HO25/PART/725": {
    "name": "AKSHATA LOKHANDE",
    "team": "Aura",
    "verified": true,
    "refNo": "KR-2025-827",
    "type": "Participation"
  }
}

interface VerificationResult {
  isValid: boolean
  certId?: string
  team?: string
  refNo?: string
  type?: string
  extractedText?: string
}

export default function CertificateVerification() {
  const [mounted, setMounted] = useState(false)
  const [verificationCount, setVerificationCount] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const [extractedText, setExtractedText] = useState<string>("")
  const [showExtractedText, setShowExtractedText] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [manualCertId, setManualCertId] = useState("")
  const [progress, setProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  // Load verification count from localStorage on mount
  useEffect(() => {
    if (mounted) {
      const savedCount = localStorage.getItem("hackorbit-verification-count")
      if (savedCount) {
        setVerificationCount(Number.parseInt(savedCount, 10))
      }
    }
  }, [mounted])

  // Mouse tracking for interactive effects
  useEffect(() => {
    if (!mounted) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mounted])

  // Check for URL parameters on component mount
  useEffect(() => {
    if (!mounted) return

    const urlParams = new URLSearchParams(window.location.search)
    const certIdFromUrl = urlParams.get("cert_id") || urlParams.get("ref")

    if (certIdFromUrl) {
      setManualCertId(certIdFromUrl)
      handleManualVerification(certIdFromUrl)
    }
  }, [mounted])

  // Extract certificate ID from text using regex
  const extractCertId = (text: string): string | null => {
    const patterns = [
      /DLG\/HO25\/PRT\/\d{4}/g,
      /DLG\/HO25\/MNT\/\d{4}/g,
      /KR-\d{4}-\d{3}/g,
      /KR-\d{4}-M\d{3}/g,
      /KR-[A-Z0-9]{4}-\d{4}/g,
    ]

    for (const pattern of patterns) {
      const matches = text.match(pattern)
      if (matches && matches.length > 0) {
        return matches[0]
      }
    }
    return null
  }

  // Verify certificate ID against database
  const verifyCertificate = (certId: string): VerificationResult => {
    const cert = certData[certId as keyof typeof certData]
    if (cert && cert.verified) {
      // Increment verification count
      const newCount = verificationCount + 1
      setVerificationCount(newCount)
      if (mounted) {
        localStorage.setItem("hackorbit-verification-count", newCount.toString())
      }

      return {
        isValid: true,
        certId,
        name: cert.name,
        team: cert.team,
        refNo: cert.refNo,
        type: cert.type,
      }
    }
    return { isValid: false }
  }

  // Handle manual verification
  const handleManualVerification = (certId: string) => {
    if (!certId.trim()) return

    const result = verifyCertificate(certId.trim())
    setVerificationResult(result)
  }

  // Load Tesseract.js dynamically only on client side
  const loadTesseract = async () => {
    if (typeof window === "undefined") return null

    const { createWorker } = await import("tesseract.js")
    const worker = await createWorker("eng")
    return worker
  }

  // Handle file selection
  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile) return

    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"]
    if (!validTypes.includes(selectedFile.type)) {
      alert("Please upload a valid image file (JPG, PNG, WEBP).")
      return
    }

    // Check file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size too large. Please upload a file smaller than 10MB.")
      return
    }

    setFile(selectedFile)
    setVerificationResult(null)
    setExtractedText("")
    setProgress(0)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.onerror = () => {
      alert("Error reading file. Please try again.")
    }
    reader.readAsDataURL(selectedFile)

    // Auto-process the file
    processFile(selectedFile)
  }

  // Simulate progress updates
  const simulateProgress = (startProgress: number, endProgress: number, duration: number) => {
    const steps = 20
    const stepSize = (endProgress - startProgress) / steps
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const newProgress = startProgress + stepSize * currentStep
      setProgress(Math.min(newProgress, endProgress))

      if (currentStep >= steps) {
        clearInterval(interval)
      }
    }, stepDuration)

    return interval
  }

  // Process file with OCR
  const processFile = async (fileToProcess: File) => {
    if (!mounted) return

    setIsProcessing(true)
    setProgress(0)

    try {
      // Convert image to data URL
      setProgress(10)
      const dataUrl = await convertImageToDataUrl(fileToProcess)
      setImagePreview(dataUrl)
      setProgress(30)

      let allExtractedText = ""

      // Load Tesseract worker
      setProgress(40)
      const worker = await loadTesseract()
      if (!worker) {
        throw new Error("Failed to load OCR engine")
      }
      setProgress(50)

      // Start progress simulation
      const progressInterval = simulateProgress(50, 90, 3000)

      try {
        // Use recognize method without logger callback to avoid DataCloneError
        const result = await worker.recognize(dataUrl)

        // Clear progress simulation and set final progress
        clearInterval(progressInterval)
        setProgress(100)

        allExtractedText = result.data.text
      } catch (error) {
        clearInterval(progressInterval)
        console.error("OCR recognition error:", error)
        throw error
      }

      await worker.terminate()
      setExtractedText(allExtractedText)

      // Extract certificate ID
      const certId = extractCertId(allExtractedText)

      if (certId) {
        const verification = verifyCertificate(certId)
        setVerificationResult({
          ...verification,
          extractedText: allExtractedText,
        })
      } else {
        setVerificationResult({
          isValid: false,
          extractedText: allExtractedText,
        })
      }
    } catch (error) {
      console.error("OCR Error:", error)
      const errorMessage = error instanceof Error ? error.message : "Error processing file. Please try again."

      setVerificationResult({
        isValid: false,
        extractedText: `Error: ${errorMessage}`,
      })

      alert(`Processing failed: ${errorMessage}`)
    } finally {
      setIsProcessing(false)
      setProgress(0)
    }
  }

  // Helper function to convert image file to data URL
  const convertImageToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        const result = e.target?.result as string
        if (result) {
          resolve(result)
        } else {
          reject(new Error("Failed to read file"))
        }
      }

      reader.onerror = () => {
        reject(new Error("Failed to read file"))
      }

      reader.readAsDataURL(file)
    })
  }

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [])

  // Print/Download verification result
  const handlePrintDownload = () => {
    if (!verificationResult) return

    const printContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Certificate Verification Result</title>
        <style>
          body { 
            font-family: 'Courier New', monospace; 
            padding: 40px; 
            background: linear-gradient(135deg, #000428 0%, #004e92 100%); 
            color: #fff; 
            margin: 0;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(0, 0, 0, 0.8);
            border-radius: 20px;
            padding: 40px;
            border: 2px solid #3b82f6;
          }
          .header { 
            text-align: center; 
            margin-bottom: 40px; 
            border-bottom: 2px solid #3b82f6;
            padding-bottom: 30px;
          }
          .logos {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .logo {
            width: 120px;
            height: 80px;
            object-fit: contain;
          }
          .title {
            color: #3b82f6; 
            font-size: 32px; 
            font-weight: bold;
            margin: 20px 0;
            text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          }
          .subtitle {
            color: #60a5fa;
            font-size: 18px;
            margin-bottom: 10px;
          }
          .result { 
            border: 3px solid #10b981; 
            padding: 30px; 
            border-radius: 15px; 
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%);
            margin-bottom: 30px;
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
          }
          .invalid { 
            border-color: #ef4444; 
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%);
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
          }
          .status { 
            font-size: 28px; 
            font-weight: bold; 
            margin-bottom: 20px; 
            text-align: center;
            text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
          }
          .details { 
            margin: 15px 0; 
            padding: 15px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            border-left: 4px solid #3b82f6;
          }
          .detail-label {
            color: #60a5fa;
            font-weight: bold;
            display: inline-block;
            width: 180px;
          }
          .detail-value {
            color: #10b981;
            font-weight: bold;
          }
          .signature-section {
            margin-top: 40px;
            text-align: right;
            border-top: 2px solid #3b82f6;
            padding-top: 30px;
          }
          .signature {
            width: 150px;
            height: 60px;
            object-fit: contain;
            margin-bottom: 10px;
          }
          .signature-text {
            color: #60a5fa;
            font-size: 14px;
          }
          .timestamp { 
            margin-top: 30px; 
            font-size: 14px; 
            color: #9ca3af; 
            text-align: center;
            border-top: 1px solid #374151;
            padding-top: 20px;
          }
          .verification-id {
            background: rgba(59, 130, 246, 0.1);
            border: 1px solid #3b82f6;
            padding: 10px;
            border-radius: 8px;
            font-family: monospace;
            text-align: center;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logos">
              <img src="https://i.ibb.co/wrwMwTw9/image.png" alt="HackOrbit Logo" class="logo hackorbit-logo" height="60" />
              <img src="https://i.ibb.co/F4cy9vmH/image.png" alt="DLG Logo" class="logo dlg-logo" height="85" />
            </div>
            <div class="title">HackOrbit Certificate Verification</div>
            <div class="subtitle">Digital Learning Group (DLG) & MITS Gwalior</div>
            <div class="subtitle">National Level Online Hackathon</div>
          </div>
          
          <div class="result ${verificationResult.isValid ? "" : "invalid"}">
            <div class="status">
              ${verificationResult.isValid ? "✅ CERTIFICATE VERIFIED" : "❌ CERTIFICATE NOT VERIFIED"}
            </div>
            
            ${
              verificationResult.isValid
                ? `
              ${verificationResult.certId ? `<div class="details"><span class="detail-label">Certificate ID:</span> <span class="detail-value">${verificationResult.certId}</span></div>` : ""}
              ${verificationResult.name ? `<div class="details"><span class="detail-label">Participant Name:</span> <span class="detail-value">${verificationResult.name}</span></div>` : ""}
              ${verificationResult.type ? `<div class="details"><span class="detail-label">Certificate Type:</span> <span class="detail-value">${verificationResult.type}</span></div>` : ""}
              ${verificationResult.team ? `<div class="details"><span class="detail-label">${verificationResult.type === "Mentor" ? "Mentor Name:" : "Team Name:"}</span> <span class="detail-value">${verificationResult.team}</span></div>` : ""}
              ${verificationResult.refNo ? `<div class="details"><span class="detail-label">Reference Number:</span> <span class="detail-value">${verificationResult.refNo}</span></div>` : ""}
              
              <div class="verification-id">
                <strong>Verification ID:</strong> HO-${Date.now().toString(36).toUpperCase()}
              </div>
            `
                : `
              <div class="details">
                <span class="detail-label">Status:</span> 
                <span style="color: #ef4444;">Certificate not found in our database</span>
              </div>
            `
            }
          </div>

          ${
            verificationResult.isValid
              ? `
            <div class="signature-section">
              <img src="https://i.ibb.co/q3v6HswF/punitsir.png" alt="Faculty Signature" class="signature" />
              <div class="signature-text">
                <strong>Dr. Punit Kumar Johari</strong><br>
                Faculty Coordinator<br>
                Digital Learning Group
              </div>
            </div>
          `
              : ""
          }

          <div class="timestamp">
            <strong>Verification Details:</strong><br>
            Verified on: ${new Date().toLocaleString()}<br>
            Verification System: HackOrbit Digital Verification Portal<br>
            Total Verifications: ${verificationCount}
          </div>
        </div>
      </body>
    </html>
  `

    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.print()
    }
  }

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-blue-400 font-mono">Loading verification system...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Enhanced Mouse Cursor Effect */}
      <div
        className="fixed w-6 h-6 bg-blue-400/30 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
        }}
      />

      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/30 via-black to-purple-900/30"></div>

      {/* Enhanced Floating Orbs with Mouse Interaction */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse transition-transform duration-300"
          style={{
            transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`,
            top: "10%",
            left: "10%",
          }}
        ></div>
        <div
          className="absolute w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse transition-transform duration-300"
          style={{
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
            top: "60%",
            right: "10%",
            animationDelay: "1s",
          }}
        ></div>
        <div
          className="absolute w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse transition-transform duration-300"
          style={{
            transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`,
            bottom: "20%",
            left: "50%",
            animationDelay: "2s",
          }}
        ></div>
      </div>

      {/* Enhanced Grid Pattern */}
      <div
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      ></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-xl z-50 border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3 group">
              <div className="relative group-hover:animate-bounce">
                <Globe className="h-8 w-8 text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-mono">
                HackOrbit
              </span>
            </div>
            <Button
              onClick={() => (window.location.href = "/")}
              className="relative bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-black font-bold border-0 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Rocket className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
              BACK TO HOME
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="animate-fade-in-up">
              <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/50 font-mono backdrop-blur-sm hover:scale-105 transition-all duration-300">
                <Zap className="w-4 h-4 mr-2 animate-pulse" />
                CERTIFICATE VERIFICATION SYSTEM
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4 font-mono animate-fade-in-up">
              Certificate Verification
            </h1>
            <p className="text-xl text-blue-100/80 font-mono animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <span className="text-blue-400">{">"}</span> Verify HackOrbit certificates instantly with advanced OCR
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              {/* Manual Input */}
              <Card className="group relative bg-black/40 border-blue-500/30 backdrop-blur-xl hover:border-blue-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative">
                  <div className="relative mb-4">
                    <Search className="h-8 w-8 text-blue-400 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <CardTitle className="text-blue-300 font-mono text-xl group-hover:text-blue-200 transition-colors duration-300">
                    Manual Verification
                  </CardTitle>
                  <CardDescription className="text-blue-200/60 font-mono">
                    <span className="text-blue-400">{">"}</span> Enter certificate ID directly for instant verification
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 relative">
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., DLG/HO25/PRT/0001"
                      value={manualCertId}
                      onChange={(e) => setManualCertId(e.target.value)}
                      className="bg-black/40 border-blue-500/50 text-blue-300 placeholder:text-blue-400/50 font-mono backdrop-blur-sm hover:border-blue-400/70 focus:border-blue-400 transition-all duration-300"
                    />
                    <Button
                      onClick={() => handleManualVerification(manualCertId)}
                      className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-black font-mono font-bold transition-all duration-300 hover:scale-105 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      Verify
                    </Button>
                  </div>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Card>

              {/* File Upload */}
              <Card className="group relative bg-black/40 border-purple-500/30 backdrop-blur-xl hover:border-purple-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative">
                  <div className="relative mb-4">
                    <Upload className="h-8 w-8 text-purple-400 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <CardTitle className="text-purple-300 font-mono text-xl group-hover:text-purple-200 transition-colors duration-300">
                    Upload Certificate Image
                  </CardTitle>
                  <CardDescription className="text-purple-200/60 font-mono">
                    <span className="text-purple-400">{">"}</span> Upload image for automatic OCR verification
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  {/* Drop Zone */}
                  <div
                    ref={dropZoneRef}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
                      isDragOver
                        ? "border-purple-400 bg-purple-500/20 scale-105"
                        : "border-purple-500/50 hover:border-purple-400 hover:bg-purple-500/10"
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        {file ? (
                          <ImageIcon className="w-12 h-12 text-purple-400 animate-bounce" />
                        ) : (
                          <Upload className="w-12 h-12 text-purple-400 animate-pulse" />
                        )}
                      </div>
                      <div>
                        <p className="text-purple-300 font-mono font-semibold">
                          {file ? file.name : "Drop certificate image here or click to upload"}
                        </p>
                        <p className="text-purple-200/60 font-mono text-sm mt-2">
                          <span className="text-purple-400">{">"}</span> Supports JPG, PNG, WEBP files (max 10MB)
                        </p>
                      </div>
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                    className="hidden"
                  />

                  {/* Processing Progress */}
                  {isProcessing && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm text-purple-300 font-mono">
                        <span>
                          <span className="text-purple-400">{">"}</span> Processing with OCR...
                        </span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-purple-900/30 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300 animate-pulse"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Card>

              {/* Extracted Text */}
              {extractedText && (
                <Card className="group relative bg-black/40 border-cyan-500/30 backdrop-blur-xl hover:border-cyan-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="relative">
                    <CardTitle className="text-cyan-300 font-mono flex items-center gap-2 group-hover:text-cyan-200 transition-colors duration-300">
                      <FileText className="w-5 h-5" />
                      Extracted Text
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowExtractedText(!showExtractedText)}
                        className="ml-auto text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20"
                      >
                        {showExtractedText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  {showExtractedText && (
                    <CardContent className="relative">
                      <div className="bg-black/60 p-4 rounded-lg border border-cyan-500/20 backdrop-blur-sm">
                        <pre className="text-cyan-100 font-mono text-sm whitespace-pre-wrap overflow-auto max-h-40">
                          {extractedText}
                        </pre>
                      </div>
                    </CardContent>
                  )}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-cyan-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </Card>
              )}
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Image Preview */}
              {imagePreview && (
                <Card className="group relative bg-black/40 border-green-500/30 backdrop-blur-xl hover:border-green-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="relative">
                    <CardTitle className="text-green-300 font-mono group-hover:text-green-200 transition-colors duration-300">
                      Certificate Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="relative">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Certificate preview"
                        className="w-full h-auto rounded-lg border border-green-500/20 transition-transform duration-300 group-hover:scale-105"
                      />
                      {verificationResult && (
                        <div className="absolute top-4 right-4">
                          <Badge
                            className={`${
                              verificationResult.isValid
                                ? "bg-green-500/20 text-green-300 border-green-500/50"
                                : "bg-red-500/20 text-red-300 border-red-500/50"
                            } font-mono animate-pulse`}
                          >
                            {verificationResult.isValid ? "✅ VERIFIED" : "❌ INVALID"}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </Card>
              )}

              {/* Verification Result */}
              {verificationResult && (
                <Card
                  className={`group relative backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden ${
                    verificationResult.isValid
                      ? "bg-green-500/10 border-green-500/30 hover:border-green-400/60"
                      : "bg-red-500/10 border-red-500/30 hover:border-red-400/60"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${verificationResult.isValid ? "from-green-500/10" : "from-red-500/10"} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>
                  <CardHeader className="relative">
                    <CardTitle
                      className={`font-mono flex items-center gap-2 text-xl ${
                        verificationResult.isValid
                          ? "text-green-300 group-hover:text-green-200"
                          : "text-red-300 group-hover:text-red-200"
                      } transition-colors duration-300`}
                    >
                      {verificationResult.isValid ? (
                        <Check className="w-8 h-8 animate-pulse" />
                      ) : (
                        <X className="w-8 h-8 animate-pulse" />
                      )}
                      Verification Result
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 relative">
                    <Alert
                      className={`${
                        verificationResult.isValid
                          ? "border-green-500/50 bg-green-500/10"
                          : "border-red-500/50 bg-red-500/10"
                      } backdrop-blur-sm`}
                    >
                      <AlertDescription
                        className={`font-mono text-lg font-bold ${
                          verificationResult.isValid ? "text-green-300" : "text-red-300"
                        }`}
                      >
                        {verificationResult.isValid
                          ? "✅ Certificate Verified Successfully"
                          : "❌ Certificate not found or invalid"}
                      </AlertDescription>
                    </Alert>

                    {verificationResult.isValid && (
                      <div className="space-y-3">
                        {verificationResult.certId && (
                          <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-green-500/20 backdrop-blur-sm hover:bg-green-500/5 transition-colors duration-300">
                            <span className="text-green-200/80 font-mono">Certificate ID:</span>
                            <span className="text-green-300 font-mono font-bold">{verificationResult.certId}</span>
                          </div>
                        )}

                        {verificationResult.type && (
                          <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-green-500/20 backdrop-blur-sm hover:bg-green-500/5 transition-colors duration-300">
                            <span className="text-green-200/80 font-mono">Certificate Type:</span>
                            <span className="text-green-300 font-mono font-bold">{verificationResult.type}</span>
                          </div>
                        )}

                        {verificationResult.name && (
  <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-green-500/20 backdrop-blur-sm hover:bg-green-500/5 transition-colors duration-300">
    <span className="text-green-200/80 font-mono">Participant Name:</span>
    <span className="text-green-300 font-mono font-bold">{verificationResult.name}</span>
  </div>
)}

                        {verificationResult.team && (
                          <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-green-500/20 backdrop-blur-sm hover:bg-green-500/5 transition-colors duration-300">
                            <span className="text-green-200/80 font-mono">
                              {verificationResult.type === "Mentor" ? "Mentor Name:" : "Team Name:"}
                            </span>
                            <span className="text-green-300 font-mono font-bold">{verificationResult.team}</span>
                          </div>
                        )}

                        {verificationResult.refNo && (
                          <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-green-500/20 backdrop-blur-sm">
                            <span className="text-green-200/80 font-mono">Reference Number:</span>
                            <span className="text-green-300 font-mono font-bold">{verificationResult.refNo}</span>
                          </div>
                        )}

                        <div className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-green-500/20 backdrop-blur-sm">
                          <span className="text-green-200/80 font-mono">Verified On:</span>
                          <span className="text-green-300 font-mono">{new Date().toLocaleString()}</span>
                        </div>
                      </div>
                    )}

                    {/* Print/Download Button */}
                    <Button
                      onClick={handlePrintDownload}
                      className="group w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-black font-bold font-mono text-lg py-3 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <Download className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                      Print/Download Verification Result
                    </Button>
                  </CardContent>
                  <div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${verificationResult.isValid ? "from-green-500 to-green-300" : "from-red-500 to-red-300"} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                  ></div>
                </Card>
              )}

              {/* QR Code Info */}
              <Card className="group relative bg-black/40 border-yellow-500/30 backdrop-blur-xl hover:border-yellow-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-yellow-300 font-mono flex items-center gap-2 group-hover:text-yellow-200 transition-colors duration-300">
                    <QrCode className="w-5 h-5 animate-pulse" />
                    QR Code Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="space-y-3 text-yellow-100/80 font-mono text-sm">
                    <p>
                      <span className="text-yellow-400">{">"}</span> Scan QR codes on certificates for instant
                      verification
                    </p>
                    <p>
                      <span className="text-yellow-400">{">"}</span> QR codes contain direct links to this verification
                      page
                    </p>
                    <p>
                      <span className="text-yellow-400">{">"}</span> Format: verify?cert_id=DLG/HO25/PRT/0001
                    </p>
                  </div>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Card>

              {/* Verification Counter */}
              <Card className="group relative bg-black/40 border-emerald-500/30 backdrop-blur-xl hover:border-emerald-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative">
                  <CardTitle className="text-emerald-300 font-mono flex items-center gap-2 group-hover:text-emerald-200 transition-colors duration-300">
                    <Zap className="w-5 h-5 animate-pulse" />
                    Verification Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-400 font-mono mb-2 animate-pulse">
                      {verificationCount.toLocaleString()}
                    </div>
                    <p className="text-emerald-100/80 font-mono text-sm">
                      <span className="text-emerald-400">{">"}</span> Total certificates verified
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                      <div className="bg-black/40 p-3 rounded-lg border border-emerald-500/20">
                        <div className="text-emerald-300 font-bold">ACTIVE</div>
                        <div className="text-emerald-100/60">24/7 System</div>
                      </div>
                      <div className="bg-black/40 p-3 rounded-lg border border-emerald-500/20">
                        <div className="text-emerald-300 font-bold">SECURE</div>
                        <div className="text-emerald-100/60">OCR Powered</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
