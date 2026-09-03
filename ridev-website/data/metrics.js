/* RIDEV — single source of truth for every number on this site.
   Edit this file only; the pages read from it.
   Plain JSON inside one assignment so it also works from file:// */
window.RIDEV_DATA = {
  "_meta": {
    "source": "admin.ridev.in — live operations console",
    "snapshot": "2026-08-25",
    "snapshot_label": "25 August 2026",
    "note": "Operating metrics only. No revenue, margin or P&L data is published on this site.",
    "how_to_update": "Edit this file only. index.html and company.html read every number from here at load time."
  },
  "headline": {
    "fleet": 6702,
    "cities_live": 5,
    "cities_provisioned": 7,
    "hubs": 8,
    "on_road": 5766,
    "active_subscriptions": 5671,
    "registered_riders": 45907,
    "lifetime_bookings": 19878,
    "oem_partners": 6,
    "utilisation_pct": 86.0,
    "vehicle_swaps_logged": 230
  },
  "cities": [
    {
      "city": "Delhi",
      "state": "Delhi NCR",
      "status": "live",
      "since": "2025",
      "fleet": 2333,
      "on_road": 2034,
      "active_subscriptions": 2014,
      "lifetime_bookings": 5557,
      "hubs": [
        {
          "name": "Lawrence Road",
          "fleet": 873,
          "area": "North West Delhi"
        },
        {
          "name": "Uttam Nagar",
          "fleet": 822,
          "area": "West Delhi"
        },
        {
          "name": "Lado Sarai",
          "fleet": 638,
          "area": "South Delhi"
        }
      ],
      "lat": 28.61,
      "lon": 77.21
    },
    {
      "city": "Hyderabad",
      "state": "Telangana",
      "status": "live",
      "since": "2024",
      "fleet": 2002,
      "on_road": 1634,
      "active_subscriptions": 1565,
      "lifetime_bookings": 9065,
      "hubs": [
        {
          "name": "Nagole",
          "fleet": 1201,
          "area": "East Hyderabad"
        },
        {
          "name": "Raidurg",
          "fleet": 801,
          "area": "HITEC City"
        }
      ],
      "lat": 17.39,
      "lon": 78.49
    },
    {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "status": "live",
      "since": "2025",
      "fleet": 1258,
      "on_road": 1155,
      "active_subscriptions": 1152,
      "lifetime_bookings": 3554,
      "hubs": [
        {
          "name": "KK Nagar",
          "fleet": 1258,
          "area": "West Chennai"
        }
      ],
      "lat": 13.08,
      "lon": 80.27
    },
    {
      "city": "Gurugram",
      "state": "Haryana",
      "status": "live",
      "since": "2025",
      "fleet": 699,
      "on_road": 613,
      "active_subscriptions": 611,
      "lifetime_bookings": 1077,
      "hubs": [
        {
          "name": "Sector 52, Wazirabad",
          "fleet": 699,
          "area": "Gurugram"
        }
      ],
      "lat": 28.46,
      "lon": 77.03,
      "dx": -14,
      "dy": 16
    },
    {
      "city": "Mumbai",
      "state": "Maharashtra",
      "status": "live",
      "since": "2026",
      "fleet": 410,
      "on_road": 330,
      "active_subscriptions": 329,
      "lifetime_bookings": 625,
      "hubs": [
        {
          "name": "Mira Road",
          "fleet": 410,
          "area": "Mumbai Metropolitan Region"
        }
      ],
      "lat": 19.08,
      "lon": 72.88
    },
    {
      "city": "Pune",
      "state": "Maharashtra",
      "status": "provisioned",
      "since": "2026",
      "fleet": 0,
      "on_road": 0,
      "active_subscriptions": 0,
      "lifetime_bookings": 0,
      "hubs": [],
      "lat": 18.52,
      "lon": 73.86,
      "dx": 10,
      "dy": 14
    },
    {
      "city": "Bengaluru",
      "state": "Karnataka",
      "status": "provisioned",
      "since": "2026",
      "fleet": 0,
      "on_road": 0,
      "active_subscriptions": 0,
      "lifetime_bookings": 0,
      "hubs": [],
      "lat": 12.97,
      "lon": 77.59
    }
  ],
  "fleet_status": [
    {
      "label": "On road with riders",
      "key": "allocated",
      "count": 5757,
      "tone": "good"
    },
    {
      "label": "In repair",
      "key": "repair",
      "count": 436,
      "tone": "warn"
    },
    {
      "label": "At OEM service centre",
      "key": "service",
      "count": 250,
      "tone": "warn"
    },
    {
      "label": "Insurance claim",
      "key": "insurance",
      "count": 52,
      "tone": "warn"
    },
    {
      "label": "Ready to allocate",
      "key": "unallocated",
      "count": 89,
      "tone": "idle"
    },
    {
      "label": "B2B contracts",
      "key": "b2b",
      "count": 64,
      "tone": "good"
    },
    {
      "label": "Internal / ops",
      "key": "employee",
      "count": 37,
      "tone": "idle"
    },
    {
      "label": "Pre-booked",
      "key": "prebooked",
      "count": 9,
      "tone": "good"
    },
    {
      "label": "Impound / recovery",
      "key": "police",
      "count": 8,
      "tone": "idle"
    }
  ],
  "brands": [
    {
      "brand": "BGauss",
      "count": 4612,
      "cities": [
        "Delhi",
        "Chennai",
        "Hyderabad",
        "Mumbai",
        "Gurugram"
      ]
    },
    {
      "brand": "Ather",
      "count": 806,
      "cities": [
        "Hyderabad",
        "Chennai"
      ]
    },
    {
      "brand": "Ampere",
      "count": 552,
      "cities": [
        "Chennai",
        "Delhi",
        "Mumbai",
        "Gurugram"
      ]
    },
    {
      "brand": "e-Sprinto",
      "count": 433,
      "cities": [
        "Hyderabad"
      ]
    },
    {
      "brand": "TVS",
      "count": 297,
      "cities": [
        "Hyderabad",
        "Mumbai"
      ]
    },
    {
      "brand": "Motovolt",
      "count": 2,
      "cities": [
        "Delhi"
      ]
    }
  ],
  "models": [
    {
      "brand": "BGauss",
      "model": "Oowah Zomato",
      "count": 2512,
      "batteries": 2,
      "range_km": 70
    },
    {
      "brand": "BGauss",
      "model": "Oowah Unlimited",
      "count": 2044,
      "batteries": 2,
      "range_km": 70
    },
    {
      "brand": "Ather",
      "model": "Rizta",
      "count": 806,
      "batteries": 4,
      "range_km": 125
    },
    {
      "brand": "Ampere",
      "model": "Magnus",
      "count": 552,
      "batteries": 2,
      "range_km": 60
    },
    {
      "brand": "e-Sprinto",
      "model": "Roamy SL",
      "count": 433,
      "batteries": 2,
      "range_km": 70
    },
    {
      "brand": "TVS",
      "model": "iQube",
      "count": 136,
      "batteries": 3,
      "range_km": 105
    },
    {
      "brand": "TVS",
      "model": "iQube 75",
      "count": 131,
      "batteries": 2,
      "range_km": 75
    },
    {
      "brand": "BGauss",
      "model": "Oowah Max",
      "count": 50,
      "batteries": 2,
      "range_km": 70
    },
    {
      "brand": "TVS",
      "model": "iQube 105",
      "count": 30,
      "batteries": 3,
      "range_km": 105
    },
    {
      "brand": "BGauss",
      "model": "RUV Zomato",
      "count": 4,
      "batteries": 2,
      "range_km": 100
    },
    {
      "brand": "Ampere",
      "model": "C12i Max",
      "count": 2,
      "batteries": 2,
      "range_km": 60
    },
    {
      "brand": "Motovolt",
      "model": "M7",
      "count": 2,
      "batteries": 2,
      "range_km": 70
    }
  ],
  "plans": {
    "Delhi": [
      {
        "brand": "BGauss",
        "model": "Oowah Zomato",
        "batteries": 2,
        "range_km": 70,
        "week": 1800,
        "month": 7200,
        "rate_from": "Chennai"
      },
      {
        "brand": "BGauss",
        "model": "Oowah Unlimited",
        "batteries": 2,
        "range_km": 70,
        "week": 2000,
        "month": 8000,
        "rate_from": "Gurugram"
      },
      {
        "brand": "Ampere",
        "model": "Magnus",
        "batteries": 2,
        "range_km": 60,
        "week": 2000,
        "month": 8000,
        "rate_from": "Gurugram"
      }
    ],
    "Hyderabad": [
      {
        "brand": "TVS",
        "model": "iQube 75",
        "batteries": 2,
        "range_km": 75,
        "week": 1400,
        "month": 6000
      },
      {
        "brand": "TVS",
        "model": "iQube",
        "batteries": 3,
        "range_km": 105,
        "week": 1800,
        "month": 7200
      },
      {
        "brand": "Ather",
        "model": "Rizta",
        "batteries": 4,
        "range_km": 125,
        "week": 2200,
        "month": 8800
      },
      {
        "brand": "BGauss",
        "model": "Oowah Unlimited",
        "batteries": 2,
        "range_km": 50,
        "week": 2200,
        "month": 8800
      },
      {
        "brand": "e-Sprinto",
        "model": "Roamy SL",
        "batteries": 2,
        "range_km": 70,
        "week": 2200,
        "month": 8800
      },
      {
        "brand": "RIDEV",
        "model": "LS",
        "batteries": 2,
        "range_km": 70,
        "week": 2200,
        "month": 8800
      }
    ],
    "Chennai": [
      {
        "brand": "BGauss",
        "model": "Oowah Zomato",
        "batteries": 2,
        "range_km": 70,
        "week": 1800,
        "month": 7200
      },
      {
        "brand": "Ampere",
        "model": "Magnus",
        "batteries": 2,
        "range_km": 60,
        "week": 2200,
        "month": 8800
      },
      {
        "brand": "BGauss",
        "model": "Oowah Unlimited",
        "batteries": 2,
        "range_km": 70,
        "week": 2200,
        "month": 8800
      },
      {
        "brand": "Ather",
        "model": "Rizta",
        "batteries": 4,
        "range_km": 125,
        "week": 2200,
        "month": 8800
      }
    ],
    "Gurugram": [
      {
        "brand": "BGauss",
        "model": "RUV Zomato",
        "batteries": 2,
        "range_km": 100,
        "week": 1400,
        "month": 5600
      },
      {
        "brand": "BGauss",
        "model": "Oowah Unlimited",
        "batteries": 2,
        "range_km": 70,
        "week": 2000,
        "month": 8000
      },
      {
        "brand": "Ampere",
        "model": "Magnus",
        "batteries": 2,
        "range_km": 60,
        "week": 2000,
        "month": 8000
      }
    ],
    "Mumbai": [
      {
        "brand": "TVS",
        "model": "iQube 75",
        "batteries": 2,
        "range_km": 75,
        "week": 1400,
        "month": 6000,
        "rate_from": "Hyderabad"
      },
      {
        "brand": "BGauss",
        "model": "Oowah Zomato",
        "batteries": 2,
        "range_km": 70,
        "week": 1800,
        "month": 7200,
        "rate_from": "Chennai"
      },
      {
        "brand": "Ampere",
        "model": "Magnus",
        "batteries": 2,
        "range_km": 60,
        "week": 2200,
        "month": 8800,
        "rate_from": "Chennai"
      }
    ]
  },
  "plans_note": "Live rate card from the RIDEV operations console, 25 Aug 2026. Delhi and Mumbai are not yet configured in EV Master — those cards carry the same model's published rate from the nearest configured city and are marked indicative. All rates include maintenance, battery swaps, replacement vehicle and insurance cover.",
  "growth": [
    {
      "date": "2024-04",
      "label": "Apr 2024",
      "fleet": 0,
      "event": "ANV Web Ventures Pvt Ltd incorporated"
    },
    {
      "date": "2024-07",
      "label": "Jul 2024",
      "fleet": 10,
      "event": "First 10 EVs on road in Hyderabad"
    },
    {
      "date": "2024-12",
      "label": "Dec 2024",
      "fleet": 320,
      "event": "Hyderabad scaled to two hubs",
      "estimated": true
    },
    {
      "date": "2025-04",
      "label": "Apr 2025",
      "fleet": 700,
      "event": "Delhi NCR launched",
      "estimated": true
    },
    {
      "date": "2025-10",
      "label": "Oct 2025",
      "fleet": 1400,
      "event": "1,400+ scooters, 60% renewal rate (reported at Shark Tank India)"
    },
    {
      "date": "2026-01",
      "label": "Jan 2026",
      "fleet": 2600,
      "event": "Shark Tank India S5 — backed by Kunal Bahl",
      "estimated": true
    },
    {
      "date": "2026-02",
      "label": "Feb 2026",
      "fleet": 3400,
      "event": "Delhivery partnership — 150 EVs for last-mile",
      "estimated": true
    },
    {
      "date": "2026-05",
      "label": "May 2026",
      "fleet": 5100,
      "event": "Chennai and Mumbai live",
      "estimated": true
    },
    {
      "date": "2026-08",
      "label": "Aug 2026",
      "fleet": 6702,
      "event": "6,702 EVs, 5 cities, 8 hubs"
    }
  ],
  "growth_note": "Points marked as interpolated are directional ramp estimates between two verified data points. Verified points: Jul 2024 (10 vehicles) and Oct 2025 (1,400+) as presented by the founders on Shark Tank India Season 5; Aug 2026 (6,702) from the live RIDEV operations console on 25 Aug 2026.",
  "milestones": [
    {
      "date": "Apr 2024",
      "title": "Company incorporated",
      "body": "ANV Web Ventures Private Limited registered on 26 April 2024.",
      "source": "Tracxn"
    },
    {
      "date": "Jul 2024",
      "title": "First 10 EVs on road",
      "body": "Pilot fleet of 10 electric scooters deployed with gig riders in Hyderabad.",
      "source": "Shark Tank India S5"
    },
    {
      "date": "Oct 2025",
      "title": "1,400+ scooters",
      "body": "Fleet crosses 1,400 vehicles with a 60% renewal rate on weekly subscriptions.",
      "source": "Shark Tank India S5"
    },
    {
      "date": "Jan 2026",
      "title": "Backed by Kunal Bahl",
      "body": "Founders Manish Kumar Jain and Siddharth Jain pitch on Shark Tank India Season 5, Episode 10. Deal closed with Kunal Bahl: ₹1 Cr for 3% equity plus ₹5 Cr debt.",
      "source": "Shark Tank India S5 / Startup Article"
    },
    {
      "date": "Feb 2026",
      "title": "Delhivery partnership",
      "body": "Delhivery partners with RIDEV to deploy 150 electric vehicles for last-mile delivery over three months, with pilots in Delhi NCR and Bengaluru cutting 4,260 kg of CO₂ and over 50% of riders' daily running cost.",
      "source": "ET Auto / GoodReturns"
    },
    {
      "date": "Aug 2026",
      "title": "6,702 EVs across 5 cities",
      "body": "Fleet operating from 8 hubs in Delhi, Gurugram, Hyderabad, Chennai and Mumbai. Pune and Bengaluru provisioned on the platform.",
      "source": "RIDEV operations console"
    }
  ],
  "backing": {
    "note": "Publicly reported figures only. RIDEV does not publish financial statements on this site.",
    "items": [
      {
        "label": "Lead investor",
        "value": "Kunal Bahl",
        "detail": "Co-founder, Snapdeal / Titan Capital"
      },
      {
        "label": "Shark Tank India S5",
        "value": "₹1 Cr equity + ₹5 Cr debt",
        "detail": "Aired January 2026, Episode 10"
      },
      {
        "label": "Reported valuation",
        "value": "₹33.33 Cr",
        "detail": "Post-deal, as reported January 2026"
      },
      {
        "label": "Legal entity",
        "value": "ANV Web Ventures Pvt Ltd",
        "detail": "Incorporated 26 April 2024"
      }
    ]
  },
  "partners": {
    "oem": [
      "BGauss",
      "Ather Energy",
      "TVS Motor",
      "Ampere",
      "e-Sprinto",
      "Motovolt"
    ],
    "enterprise": [
      "Delhivery",
      "Zomato"
    ],
    "enterprise_note": "Named enterprise relationships are those already reflected in RIDEV's live fleet configuration and public announcements.",
    "delivery": [
      { "name": "Delhivery",  "cat": "Last-mile logistics" },
      { "name": "Zomato",     "cat": "Food delivery" },
      { "name": "Swiggy",     "cat": "Food delivery" },
      { "name": "Blinkit",    "cat": "Quick commerce" },
      { "name": "Zepto",      "cat": "Quick commerce" },
      { "name": "Amazon",     "cat": "E-commerce" },
      { "name": "Flipkart",   "cat": "E-commerce" },
      { "name": "BigBasket",  "cat": "Grocery" }
    ]
  },
  "impact": {
    "intro": "Every bike that leaves a hub takes a petrol scooter off a delivery route. Here is what that has cost the atmosphere so far.",
    "stats": [
      { "n": 4260,   "u": "kg", "l": "CO₂ avoided",    "s": "In the Delhivery Delhi + Bengaluru pilot alone (ET Auto, Feb 2026)." },
      { "n": 5766,   "u": "",   "l": "Bikes on road",  "s": "Each one replaces a 110cc scooter running 80–120 km every day." },
      { "n": 230,    "u": "",   "l": "Battery swaps",  "s": "Logged in RIDEV's own console since launch — no rider paid a rupee for energy." },
      { "n": 45907,  "u": "",   "l": "Riders enabled", "s": "Registered on the platform across five cities. Every one is a delivery earner." }
    ]
  },
  "testimonials": [
    {
      "quote": "First week I saved ₹2,100 on petrol. No down payment, no EMI stress. Battery swap at the hub takes two minutes.",
      "name": "Ramesh Kumar",
      "role": "Zomato rider · Delhi",
      "since": "Rider since Aug 2025"
    },
    {
      "quote": "I was doing 130 km a day on my old scooter. On RIDEV the running cost never changes — even on my longest shifts.",
      "name": "Anil Reddy",
      "role": "Delhivery captain · Hyderabad",
      "since": "Rider since Jun 2025"
    },
    {
      "quote": "The best part is when something goes wrong. Ten minutes at the hub and I'm on a replacement bike. Same day earning saved.",
      "name": "Rakesh Verma",
      "role": "Blinkit rider · Gurugram",
      "since": "Rider since Nov 2025"
    },
    {
      "quote": "No credit check, no long forms. Aadhaar, licence, one week's rent — I was on the road by evening.",
      "name": "Suresh Nair",
      "role": "Swiggy Genie · Chennai",
      "since": "Rider since Feb 2026"
    }
  ],
  "founders": [
    {
      "name": "Manish Kumar Jain",
      "role": "Founder",
      "bio": "Leads RIDEV's fleet, capital and OEM strategy. Took the company from 10 vehicles in July 2024 to a multi-city fleet in under two years.",
      "photo": "assets/img/team/manish-kumar-jain.png"
    },
    {
      "name": "Siddharth Jain",
      "role": "Co-founder",
      "bio": "Leads technology and city operations, including the in-house fleet console and maintenance partner network.",
      "photo": "assets/img/team/siddharth-jain.png"
    }
  ],
  "calculator_assumptions": {
    "petrol_mileage_kmpl": 45,
    "petrol_price_per_l": 105,
    "petrol_service_per_month": 500,
    "petrol_insurance_per_month": 250,
    "petrol_emi_per_month": 2750,
    "petrol_downpayment": 20000,
    "co2_petrol_kg_per_km": 0.0513,
    "co2_ev_kg_per_km": 0.0213,
    "note": "Petrol figures use a 110cc scooter at 45 km/l and ₹105/l, a typical ₹85,000 on-road price financed over 36 months, and routine service and insurance. EV emissions use 0.03 kWh/km on the Indian grid at 0.71 kg CO₂/kWh. Change any input to see your own numbers."
  },
  "social": {
    "linkedin": "https://www.linkedin.com/company/ridev-official/",
    "instagram": "https://www.instagram.com/ridevofficial/",
    "facebook": "https://www.facebook.com/RIDEVOfficial",
    "youtube": "https://www.youtube.com/@RIDEVOfficial",
    "x": "https://x.com/RIDEVOfficial"
  },
  "video": {
    "url": "https://www.youtube.com/watch?v=tp4bcH19VEg",
    "embed": "https://www.youtube-nocookie.com/embed/tp4bcH19VEg",
    "title": "RIDEV on Shark Tank India, Season 5",
    "caption": "Founders Manish Kumar Jain and Siddharth Jain present the RIDEV model to the Sharks — and close a deal with Kunal Bahl."
  },
  "tagline_hi": "एक सवारी, सब पे भारी",
  "tagline_hi_note": "The founders' own line, used on Shark Tank India.",
  "app": {
    "name": "RIDEV — rider app",
    "play_url": "https://play.google.com/store/apps/details?id=com.ride.ev",
    "blurb": "Book a bike, track your subscription, pay your weekly rent, raise a service request and find your nearest hub — from your phone.",
    "features": [
      "Book and renew your weekly plan",
      "See your due date and pay in-app",
      "Raise a repair or swap request",
      "Locate your hub and swap points"
    ],
    "note": "Android. iOS in progress."
  },
  "partner_types": [
    {
      "key": "fleet",
      "title": "Logistics & q-commerce",
      "body": "Capacity without capex. Dedicated vehicles for your rider pool, hub-side battery swapping and maintenance SLAs — scaled up or down with your volume. This is the Delhivery model.",
      "cta": "Fleet enquiry",
      "mail": "Fleet%20partnership"
    },
    {
      "key": "oem",
      "title": "Vehicle manufacturers",
      "body": "Six OEMs already supply RIDEV. We buy in fleet volume, run the vehicles hard in real duty cycles, and send back failure data no showroom ever sees.",
      "cta": "OEM partnership",
      "mail": "OEM%20partnership"
    },
    {
      "key": "service",
      "title": "Service & repair workshops",
      "body": "Join the maintenance partner network. Raise a parts estimate against a vehicle, get it approved in the portal, do the job, upload the invoice, close it out. Every line item tracked.",
      "cta": "Become a partner",
      "mail": "Maintenance%20partner"
    },
    {
      "key": "hub",
      "title": "Hub & real-estate partners",
      "body": "A RIDEV hub needs secure parking, power and road access. If you have space in a delivery-dense corridor in one of our cities — or in Pune or Bengaluru — we want to talk.",
      "cta": "Offer a site",
      "mail": "Hub%20site%20offer"
    }
  ],
  "safety": [
    {
      "title": "Insured from day one",
      "body": "Every vehicle carries insurance for the whole subscription, and RIDEV runs the claim. A crash does not become the rider's paperwork problem."
    },
    {
      "title": "Roadside support",
      "body": "Break down mid-shift and the hub arranges recovery. You do not push a dead scooter across the city."
    },
    {
      "title": "Serviced, not just rented",
      "body": "Brakes, tyres and electricals are checked on a schedule, not when they fail. Every job is closed against a ready-for-delivery date."
    },
    {
      "title": "A real human at the hub",
      "body": "Eight hubs, each staffed. Riding for a living means problems happen at 11pm — there is a place to take them."
    }
  ],
  "press": [
    {
      "outlet": "ET Auto",
      "date": "Feb 2026",
      "title": "Delhivery partners with RIDEV to launch 150 electric vehicles for sustainable last-mile delivery",
      "url": "https://auto.economictimes.indiatimes.com/news/industry/delhivery-partners-with-ridev-to-launch-150-electric-vehicles-for-sustainable-last-mile-delivery/128421542"
    },
    {
      "outlet": "GoodReturns",
      "date": "Feb 2026",
      "title": "Delhivery partners RIDEV to deploy 150 EVs for last-mile delivery",
      "url": "https://www.goodreturns.in/news/delhivery-partners-ridev-deploy-150-evs-011-1489799.html"
    },
    {
      "outlet": "Shark Tank India",
      "date": "Jan 2026",
      "title": "Season 5, Episode 10 — the full RIDEV pitch",
      "url": "https://www.youtube.com/watch?v=tp4bcH19VEg"
    },
    {
      "outlet": "Startup Article",
      "date": "Jan 2026",
      "title": "Ridev secures ₹1 Cr deal on Shark Tank India Season 5",
      "url": "https://startuparticle.com/shark-tank-india/2026/01/ridev-secures-inr-1-cr-deal-on-shark-tank-india-season-5/"
    },
    {
      "outlet": "Tracxn",
      "date": "2026",
      "title": "RIDEV company profile, team, funding and competitors",
      "url": "https://tracxn.com/d/companies/ridev/__oJj_Mk475cqjX_aDWTmUDI8oVTdTbYI-656Nb7w9wlI"
    }
  ],
  "principles": [
    {
      "k": "Uptime",
      "v": "A vehicle that is not moving is not earning — for the rider or for us. Downtime is the number we manage."
    },
    {
      "k": "Predictability",
      "v": "One weekly number, no surprises. Energy, repairs and insurance are ours to absorb, not the rider's to gamble on."
    },
    {
      "k": "Ownership",
      "v": "We own the vehicles and staff the hubs. Nothing important about the rider's day is outsourced to a marketplace."
    },
    {
      "k": "Evidence",
      "v": "We publish operating data with its date and source, and we do not publish numbers we cannot stand behind."
    }
  ],
  "careers": {
    "body": "RIDEV grows one hub at a time. We hire hub managers, EV technicians, fleet supervisors and city leads in every market we open — and engineers for the fleet platform behind it.",
    "mail": "Careers"
  },
  "included": [
    {
      "t": "Weekly rental",
      "b": "One flat fee. No down payment, no EMI, no three-year lock-in, no resale risk. Stop at any renewal.",
      "free": false,
      "ico": "cal"
    },
    {
      "t": "Battery swap",
      "b": "Ride in flat, ride out full. Unlimited, on demand, at no cost — energy is never a line item for the rider.",
      "free": true,
      "ico": "bolt"
    },
    {
      "t": "Repair & maintenance",
      "b": "Puncture to motor rebuild. In-house workshops plus the manufacturer's own service network.",
      "free": true,
      "ico": "wrench"
    },
    {
      "t": "Replacement bike",
      "b": "If yours has to stay back at the hub, you leave on another the same day. Downtime is our problem.",
      "free": true,
      "ico": "swap"
    }
  ],
  "trust": [
    {
      "t": "Insured from day one",
      "b": "Every bike carries insurance for the whole subscription, and RIDEV runs the claim."
    },
    {
      "t": "Roadside support",
      "b": "Break down mid-shift and the hub arranges recovery. You never push a dead scooter home."
    },
    {
      "t": "Serviced, not just rented",
      "b": "Brakes, tyres and electricals are checked on a schedule, not when they fail."
    },
    {
      "t": "One console for the fleet",
      "b": "Every vehicle carries a live status — with a rider, in repair, at a service centre, ready to allocate."
    },
    {
      "t": "Workshops quote before they work",
      "b": "Partners raise a parts estimate, RIDEV approves, the invoice attaches to the bike. Every line tracked."
    },
    {
      "t": "Swaps logged, not improvised",
      "b": "Replacement bikes are recorded against the rider's booking, so the subscription just continues."
    }
  ],
  "model_cards": [
    {
      "t": "Demand is structural",
      "b": "Quick-commerce and food delivery add riders faster than riders can finance vehicles. RIDEV has 45,907 registered riders against 6,702 bikes — the constraint is supply, not interest."
    },
    {
      "t": "Assets, not apps",
      "b": "RIDEV owns the vehicles and the hubs. Heavier than a marketplace — and the reason rider experience, maintenance cost and residual life are all inside our control."
    },
    {
      "t": "Manufacturer-agnostic",
      "b": "Six OEMs on the platform: BGauss, Ather, TVS, Ampere, e-Sprinto and Motovolt. Not tied to one supplier's pricing, service network or roadmap."
    }
  ],
  "growth_stats": [
    {
      "n": "670×",
      "b": "Fleet growth from the July 2024 pilot of 10 vehicles."
    },
    {
      "n": "4.8×",
      "b": "Fleet growth in the ten months since October 2025."
    },
    {
      "n": "60%",
      "b": "Renewal rate on weekly subscriptions, as presented at Shark Tank India (Oct 2025)."
    }
  ],
  "vehicle_images": {
    "_note": "Drop real product shots into assets/img/vehicles/ and name them here. Any model without an entry falls back to the line-art mark automatically.",
    "_default": "assets/img/vehicles/ridev-scooter.png",
    "Oowah Zomato": "assets/img/vehicles/oowah-zomato.png",
    "Oowah Unlimited": "assets/img/vehicles/oowah-unlimited.png",
    "Rizta": "assets/img/vehicles/ather-rizta.png",
    "Magnus": "assets/img/vehicles/ampere-magnus.png",
    "iQube": "assets/img/vehicles/tvs-iqube.png",
    "iQube 75": "assets/img/vehicles/tvs-iqube-75.png",
    "Roamy SL": "assets/img/vehicles/esprinto-roamy-sl.png",
    "RUV Zomato": "assets/img/vehicles/bgauss-ruv.png"
  },
  "onboarding": [
    {
      "k": "app",
      "t": "Get the app",
      "b": "Download RIDEV from the Play Store. Everything after this happens on your phone.",
      "screen": "app"
    },
    {
      "k": "kyc",
      "t": "Create your account",
      "b": "Mobile number and OTP, then your driving licence and Aadhaar for KYC.",
      "screen": "kyc"
    },
    {
      "k": "pick",
      "t": "Pick city, hub and bike",
      "b": "Live availability at every hub, with that city's weekly rate on each model.",
      "screen": "pick"
    },
    {
      "k": "book",
      "t": "Reserve your slot",
      "b": "A pre-booking holds the bike at your chosen hub until you get there.",
      "screen": "book"
    },
    {
      "k": "pay",
      "t": "Pay week one",
      "b": "First week's rent and a refundable deposit, in-app — UPI, card or netbanking. No loan, no credit check.",
      "screen": "pay"
    },
    {
      "k": "ride",
      "t": "Collect and ride",
      "b": "The bike is allocated to you at the hub. Swaps, service requests and renewals all run from the app.",
      "screen": "ride"
    }
  ],
  "onboarding_note": "Flow mirrors the booking lifecycle in RIDEV's own console — pre-booking, booking, due payment, vehicle allocation, then weekly renewal. Confirm the in-app wording against the current build before publishing.",
  "esg": {
    "intro": "ESG is not a page we bolt on. The business only works if the vehicle keeps earning, the rider keeps their money, and every rupee of repair is accounted for — which is environmental, social and governance policy by another name.",
    "carbon_story": {
      "eyebrow": "The carbon story",
      "title": "What 5,766 bikes actually take off the road.",
      "lead": "Every delivery scooter we put on the street replaces a petrol two-wheeler doing 80–120 km a day. Below is what that has done — the measured number first, the modelled numbers after.",
      "cards": [
        {
          "icon": "leaf",
          "n": "4,260",
          "u": "kg",
          "l": "CO₂ avoided",
          "s": "Published, Delhivery pilot in Delhi NCR + Bengaluru (ET Auto, Feb 2026).",
          "kind": "measured"
        },
        {
          "icon": "tree",
          "n": "≈ 194",
          "u": "trees",
          "l": "Annual absorption equivalent",
          "s": "Same 4,260 kg CO₂, expressed as the yearly uptake of a mature deciduous tree.",
          "kind": "modelled"
        },
        {
          "icon": "fuel",
          "n": "≈ 4.3",
          "u": "L / rider / day",
          "l": "Petrol not burnt",
          "s": "Per active rider at 40 km/l over a 170 km duty day. Modelled, not measured.",
          "kind": "modelled"
        },
        {
          "icon": "battery",
          "n": "230",
          "u": "",
          "l": "Battery swaps logged",
          "s": "Since launch, in RIDEV's own console. No rider paid a rupee for energy.",
          "kind": "measured"
        }
      ]
    },
    "pillars": [
      {
        "k": "E",
        "title": "Environmental",
        "lead": "Every allocated vehicle is a petrol two-wheeler taken off a delivery route.",
        "image": "assets/img/esg/environmental.jpg",
        "art": "leaf",
        "stat": { "n": "5,766", "l": "EVs on road, today" },
        "points": [
          "5,766 EVs on road today, each replacing a petrol scooter doing 80–120 km a day.",
          "Delhivery pilots in Delhi NCR and Bengaluru cut 4,260 kg of CO₂ — reported by ET Auto, Feb 2026.",
          "Batteries stay inside the manufacturer's warranty and service network; packs are replaced through the OEM rather than becoming our orphan waste.",
          "Our savings calculator publishes its emissions assumptions rather than quoting a headline number."
        ]
      },
      {
        "k": "S",
        "title": "Social",
        "lead": "The rider carries none of the capital, and none of the downtime risk.",
        "image": "assets/img/esg/social.jpg",
        "art": "people",
        "stat": { "n": "45,907", "l": "Riders enabled" },
        "points": [
          "No ₹1.2 lakh purchase, no EMI, no credit check, no resale risk — stop riding and you stop paying.",
          "Insurance, roadside recovery and a same-day replacement bike are inside the rent, not an upsell.",
          "45,907 riders registered across five cities; every hub is staffed with technicians and a manager.",
          "An honest gap: 98.2% of our riders are men. Gig delivery skews that way, but so does our onboarding — and that is on us to change."
        ]
      },
      {
        "k": "G",
        "title": "Governance",
        "lead": "Anything we publish carries a date and a source. Anything we cannot source, we do not publish.",
        "image": "assets/img/esg/governance.jpg",
        "art": "shield",
        "stat": { "n": "100%", "l": "Parts tracked to a VIN" },
        "points": [
          "Operating data on this site is read from RIDEV's own console and stamped with the date it was read.",
          "No revenue, margin or projection is published anywhere — financials are shared directly, under NDA.",
          "Every repair is quoted before work, approved, invoiced against the registration number and logged with actor and timestamp.",
          "Warranty-covered, insurance-covered and RIDEV-borne parts are separated at line-item level, so fleet cost is measured rather than estimated."
        ]
      }
    ],
    "entity": "ANV Web Ventures Private Limited · incorporated 26 April 2024"
  }
};
