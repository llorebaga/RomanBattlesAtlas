import type { Battle } from "@/types/history";

const commonAncient = ["polybius-1"];
const commonModern = ["lazenby-1996", "hoyos-2015"];

const secondAncient = ["polybius-3", "livy-21-30"];
const secondModern = ["lazenby-1978", "goldsworthy-2000"];

const macedonAncient = ["polybius-18", "livy-31-33"];
const macedonModern = ["walbank-1940", "eckstein-2008"];

const firstPunicWar: Battle[] = [
  {
    id: "messana", slug: "messana", name: "Battle of Messana", kind: "land", startYear: -264, endYear: -264, displayDate: "264 BCE", location: "Messana, north-eastern Sicily", coordinates: [15.55, 38.19], uncertainty: { radiusKm: 8, certainty: "probable", note: "The city is secure; the exact battlefield footprint is not." }, major: true,
    belligerents: ["Roman Republic", "Carthage and Syracuse"], commanders: [{ faction: "rome", names: ["Appius Claudius Caudex"], certainty: "attested" }, { faction: "carthage", names: ["Hanno"], certainty: "probable" }], result: "Roman strategic success", summary: "Rome crossed the strait and established itself in Sicily, turning a local dispute into a long Mediterranean war.", significance: "The intervention opened the First Punic War and drew Rome into sustained overseas campaigning.", ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["Accounts compress multiple confrontations around Messana.", "Exact troop movements shown on the atlas are schematic."], nextSlug: "agrigentum"
  },
  {
    id: "agrigentum", slug: "agrigentum", name: "Siege of Agrigentum", kind: "siege", startYear: -262, endYear: -261, displayDate: "262–261 BCE", location: "Akragas (Agrigento), southern Sicily", coordinates: [13.58, 37.31], uncertainty: { radiusKm: 6, certainty: "probable", note: "The urban location is known; siege works and field actions are not precisely located." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Lucius Postumius Megellus", "Quintus Mamilius Vitulus"], certainty: "attested" }, { faction: "carthage", names: ["Hannibal Gisco", "Hanno"], certainty: "probable" }], result: "Roman victory", summary: "A prolonged siege and relief battle ended with Roman capture of the major Carthaginian base at Akragas.", significance: "The victory showed that Rome intended to contest control of Sicily rather than merely protect Messana.", ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["The sequence and geography of the relief battle remain reconstructed."], previousSlug: "messana", nextSlug: "mylae"
  },
  {
    id: "mylae", slug: "mylae", name: "Battle of Mylae", kind: "naval", startYear: -260, endYear: -260, displayDate: "260 BCE", location: "Waters off Mylae (modern Milazzo), Sicily", coordinates: [15.23, 38.29], uncertainty: { radiusKm: 18, certainty: "probable", note: "The general coastal setting is accepted; the precise battle area is unknown." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Gaius Duilius"], certainty: "attested" }, { faction: "carthage", names: ["Hannibal Gisco"], certainty: "attested" }], result: "Roman victory", summary: "Rome won its first major naval victory after converting boarding skill into an advantage at sea, traditionally associated with the corvus boarding bridge.", significance: "Mylae proved that Carthaginian seamanship did not make naval resistance futile and changed the strategic possibilities of the war.",
    context: "After the loss of the first Roman naval detachment near the Lipari Islands, the consul Gaius Duilius took command. Polybius describes a Roman fleet newly equipped for boarding against a more experienced Carthaginian force. The encounter belongs to Rome’s rapid, risky expansion into naval warfare.",
    forces: [
      { side: "Rome", estimate: "Approximately 100–120 ships in modern reconstructions", certainty: "disputed", note: "Ancient figures and the fleet’s exact composition are debated." },
      { side: "Carthage", estimate: "Approximately 120–130 ships often inferred", certainty: "disputed", note: "Not a secure order of battle." },
    ],
    casualties: [
      { side: "Rome", estimate: "Not reliably preserved", certainty: "disputed" },
      { side: "Carthage", estimate: "Polybius reports about 50 ships captured or sunk", certainty: "probable", note: "The conventional total depends on the transmitted narrative." },
    ],
    moments: [
      { title: "Fleets make contact", description: "The Carthaginian vanguard approached confidently, apparently expecting Roman crews to be vulnerable in conventional maneuver.", certainty: "probable" },
      { title: "Boarding devices deployed", description: "Roman boarding bridges fastened enemy vessels and turned close contact into infantry combat. Their exact construction and handling remain debated.", certainty: "attested" },
      { title: "Carthaginian counter-maneuver", description: "Following ships attempted attacks from the sides and stern, but more vessels were caught in boarding actions.", certainty: "probable" },
      { title: "Withdrawal", description: "The surviving Carthaginian fleet broke contact; Rome retained the field and celebrated Duilius with a triumph.", certainty: "attested" },
    ],
    ancientSourceIds: ["polybius-1", "zonaras-8"], modernSourceIds: ["lazenby-1996", "hoyos-2015", "rankov-2011"], uncertaintyNotes: ["No exact battle track survives.", "The form, universality, and later use of the corvus are debated.", "Ship totals are literary estimates, not audited fleet records.", "The map coordinate is a representative point offshore."], previousSlug: "agrigentum", nextSlug: "sulci"
  },
  {
    id: "sulci", slug: "sulci", name: "Battle of Sulci", kind: "naval", startYear: -258, endYear: -258, displayDate: "c. 258 BCE", location: "Waters near Sulci, south-west Sardinia", coordinates: [8.42, 39.08], uncertainty: { radiusKm: 35, certainty: "disputed", note: "Ancient testimony is brief and the precise location is not known." }, major: false,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Gaius Sulpicius Paterculus"], certainty: "probable" }, { faction: "carthage", names: ["Hannibal Gisco"], certainty: "probable" }], result: "Roman victory", summary: "A poorly documented Roman naval success off Sardinia.", significance: "The action widened the maritime theater beyond Sicily.", ancientSourceIds: ["zonaras-8"], modernSourceIds: commonModern, uncertaintyNotes: ["Date, scale, and exact location require scholarly review."], previousSlug: "mylae", nextSlug: "tyndaris"
  },
  {
    id: "tyndaris", slug: "tyndaris", name: "Battle of Tyndaris", kind: "naval", startYear: -257, endYear: -257, displayDate: "257 BCE", location: "Waters off Tyndaris, northern Sicily", coordinates: [15.05, 38.14], uncertainty: { radiusKm: 18, certainty: "probable", note: "Representative offshore point; precise positions are unknown." }, major: false,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Gaius Atilius Regulus"], certainty: "attested" }, { faction: "carthage", names: ["Unknown"], certainty: "disputed" }], result: "Inconclusive or limited Roman success", summary: "An improvised naval engagement in which the Roman consul’s advance squadron was nearly cut off before the main fleet arrived.", significance: "The clash illustrates the risks of command and formation in ancient fleet actions.", ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["The outcome is characterized differently in modern summaries."], previousSlug: "sulci", nextSlug: "cape-ecnomus"
  },
  {
    id: "cape-ecnomus", slug: "cape-ecnomus", name: "Battle of Cape Ecnomus", kind: "naval", startYear: -256, endYear: -256, displayDate: "256 BCE", location: "Off southern Sicily near Ecnomus", coordinates: [13.24, 37.1], uncertainty: { radiusKm: 35, certainty: "disputed", note: "The coastal association is strong, but the enormous battle’s precise position and geometry are reconstructed." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Marcus Atilius Regulus", "Lucius Manlius Vulso Longus"], certainty: "attested" }, { faction: "carthage", names: ["Hamilcar", "Hanno"], certainty: "attested" }], result: "Roman victory", summary: "A vast fleet engagement cleared the way for Rome’s invasion of North Africa.", significance: "The victory projected Roman power across the sea and created the war’s most serious direct threat to Carthage.", ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["Ancient ship and personnel totals may be exaggerated.", "Published tactical diagrams are interpretations of Polybius."], previousSlug: "tyndaris", nextSlug: "africa-invasion"
  },
  {
    id: "africa-invasion", slug: "africa-invasion", name: "Roman invasion of Africa", kind: "campaign", startYear: -256, endYear: -255, displayDate: "256–255 BCE", location: "Cap Bon and Carthaginian hinterland", coordinates: [10.8, 36.75], uncertainty: { radiusKm: 70, certainty: "disputed", note: "This marker summarizes a broad campaign rather than one event site." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Marcus Atilius Regulus"], certainty: "attested" }, { faction: "carthage", names: ["Multiple commanders"], certainty: "probable" }], result: "Initial Roman gains; eventual Roman defeat", summary: "Roman forces landed near Aspis and campaigned inland before the expedition collapsed in 255 BCE.", significance: "The campaign came close to forcing terms but ultimately exposed the hazards of sustaining an army overseas.", ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["Campaign routes and several place identifications are disputed."], previousSlug: "cape-ecnomus", nextSlug: "adys"
  },
  {
    id: "adys", slug: "adys", name: "Battle of Adys", kind: "land", startYear: -255, endYear: -255, displayDate: "255 BCE", location: "Adys, traditionally placed near Uthina, Tunisia", coordinates: [10.47, 36.55], uncertainty: { radiusKm: 35, certainty: "disputed", note: "The ancient toponym has no universally accepted modern identification." }, major: false,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Marcus Atilius Regulus"], certainty: "attested" }, { faction: "carthage", names: ["Hasdrubal", "Bostar", "Hamilcar"], certainty: "probable" }], result: "Roman victory", summary: "Roman troops attacked a Carthaginian position in terrain that limited cavalry and elephants.", significance: "The victory brought Regulus closer to Carthage and opened negotiations.", ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["The location and tactical reconstruction remain disputed."], previousSlug: "africa-invasion", nextSlug: "bagradas"
  },
  {
    id: "bagradas", slug: "bagradas", name: "Battle of the Bagradas River", kind: "land", startYear: -255, endYear: -255, displayDate: "255 BCE", location: "Bagradas valley near Tunis", coordinates: [10.23, 36.76], uncertainty: { radiusKm: 30, certainty: "disputed", note: "Multiple sites on the lower river plain have been proposed." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Marcus Atilius Regulus"], certainty: "attested" }, { faction: "carthage", names: ["Xanthippus"], certainty: "attested" }], result: "Decisive Carthaginian victory", summary: "Carthaginian cavalry, elephants, and infantry defeated Regulus’ army on open ground.", significance: "The defeat ended Rome’s African invasion and prolonged the war.", ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["Force and casualty numbers come through literary transmission.", "Battlefield placement is approximate."], previousSlug: "adys", nextSlug: "panormus"
  },
  {
    id: "panormus", slug: "panormus", name: "Battle of Panormus", kind: "land", startYear: -250, endYear: -250, displayDate: "250 BCE", location: "Outside Panormus (Palermo), Sicily", coordinates: [13.34, 38.1], uncertainty: { radiusKm: 12, certainty: "probable", note: "The city is secure; the battlefield’s exact extent is unknown." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Lucius Caecilius Metellus"], certainty: "attested" }, { faction: "carthage", names: ["Hasdrubal"], certainty: "attested" }], result: "Roman victory", summary: "A Roman defense near Panormus repelled Carthaginian forces and captured elephants.", significance: "The result strengthened Roman control of northern Sicily and reduced the psychological impact of Carthaginian elephants.", ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["The detailed use of terrain and missiles is reconstructed from literary narrative."], previousSlug: "bagradas", nextSlug: "lilybaeum"
  },
  {
    id: "lilybaeum", slug: "lilybaeum", name: "Siege of Lilybaeum", kind: "siege", startYear: -250, endYear: -241, displayDate: "250–241 BCE", location: "Lilybaeum (Marsala), western Sicily", coordinates: [12.43, 37.8], uncertainty: { radiusKm: 6, certainty: "probable", note: "The city location is known; individual siege works and harbor actions are generalized." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Changing annual commands"], certainty: "attested" }, { faction: "carthage", names: ["Himilco"], certainty: "attested" }], result: "Carthage held the city until the peace settlement", summary: "Rome maintained a long, difficult siege while Carthaginian blockade-runners kept the port connected.", significance: "The stalemate made command of the surrounding sea decisive to the war’s conclusion.", ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["The nine-year siege contained many distinct operations not yet represented individually."], previousSlug: "panormus", nextSlug: "drepana"
  },
  {
    id: "drepana", slug: "drepana", name: "Battle of Drepana", kind: "naval", startYear: -249, endYear: -249, displayDate: "249 BCE", location: "Harbor approaches at Drepana (Trapani)", coordinates: [12.49, 38.03], uncertainty: { radiusKm: 12, certainty: "probable", note: "The harbor setting is secure; ship-by-ship positions are unknowable." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Publius Claudius Pulcher"], certainty: "attested" }, { faction: "carthage", names: ["Adherbal"], certainty: "attested" }], result: "Decisive Carthaginian victory", summary: "A Roman surprise attack lost cohesion in the confined approaches, allowing Adherbal to deploy at sea and trap the fleet against the coast.", significance: "Rome’s worst naval defeat of the war delayed a return to fleet operations for years.", ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["Tactical diagrams are modern interpretations.", "Anecdotes about auspices do not establish operational causation."], previousSlug: "lilybaeum", nextSlug: "aegates"
  },
  {
    id: "aegates", slug: "aegates", name: "Battle of the Aegates Islands", kind: "naval", startYear: -241, endYear: -241, displayDate: "10 March 241 BCE (traditional)", location: "Aegates Islands, western Sicily", coordinates: [11.93, 37.97], uncertainty: { radiusKm: 22, certainty: "disputed", note: "Archaeological finds refine the battle zone, but the action’s full extent remains under study." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Gaius Lutatius Catulus", "Quintus Valerius Falto"], certainty: "attested" }, { faction: "carthage", names: ["Hanno"], certainty: "attested" }], result: "Decisive Roman victory", summary: "A rebuilt Roman fleet intercepted a Carthaginian relief convoy and won the battle that ended the war.", significance: "Carthage sought peace, evacuated Sicily, and accepted Roman terms.", ancientSourceIds: commonAncient, modernSourceIds: commonModern, uncertaintyNotes: ["New underwater archaeology continues to change understanding of the engagement area.", "The plotted point is representative, not definitive."], previousSlug: "drepana"
  },
];

const secondPunicWar: Battle[] = [
  {
    id: "saguntum", slug: "saguntum", name: "Siege of Saguntum", kind: "siege", startYear: -219, endYear: -219, displayDate: "219 BCE", location: "Saguntum (Sagunto), eastern Iberia", coordinates: [-0.2735, 39.6766], uncertainty: { radiusKm: 5, certainty: "probable", note: "The city site is secure; individual siege works are not located." }, major: true,
    belligerents: ["Saguntum (allied to Rome)", "Carthage"], commanders: [{ faction: "carthage", names: ["Hannibal"], certainty: "attested" }], result: "Carthaginian capture after a months-long siege", summary: "Hannibal stormed a city allied to Rome, precipitating the Roman declaration of war.", significance: "The assault gave Rome its casus belli and opened the Second Punic War.", ancientSourceIds: secondAncient, modernSourceIds: secondModern, uncertaintyNotes: ["The precise length and chronology of the siege are debated.", "Whether Saguntum lay inside or outside the Ebro treaty line is disputed."], nextSlug: "alps-crossing"
  },
  {
    id: "alps-crossing", slug: "alps-crossing", name: "Hannibal’s crossing of the Alps", kind: "campaign", startYear: -218, endYear: -218, displayDate: "late 218 BCE", location: "Western Alps (exact pass disputed)", coordinates: [6.95, 45.08], uncertainty: { radiusKm: 60, certainty: "disputed", note: "No proposed pass commands scholarly consensus; this marker summarizes a long route." }, major: true,
    belligerents: ["Carthage", "Alpine Gallic peoples"], commanders: [{ faction: "carthage", names: ["Hannibal"], certainty: "attested" }], result: "The army reaches Italy after heavy losses", summary: "Hannibal led a mixed army, with elephants, over the Alps into the Po valley in late 218, absorbing severe losses to weather, terrain, and hostile tribes.", significance: "The march carried the war into Italy itself and made Hannibal a direct threat to Rome for over a decade.", ancientSourceIds: secondAncient, modernSourceIds: secondModern, uncertaintyNotes: ["The identity of the pass (Traversette, Clapier, Mont Cenis, and others) is unresolved.", "Ancient casualty and elephant figures are literary estimates.", "The plotted point represents the crossing, not one location."], previousSlug: "saguntum", nextSlug: "ticinus"
  },
  {
    id: "ticinus", slug: "ticinus", name: "Battle of the Ticinus", kind: "land", startYear: -218, endYear: -218, displayDate: "November 218 BCE", location: "Near the river Ticinus, north of the Po", coordinates: [8.95, 45.28], uncertainty: { radiusKm: 20, certainty: "disputed", note: "A cavalry skirmish whose exact site is not fixed." }, major: false,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Publius Cornelius Scipio (the elder)"], certainty: "attested" }, { faction: "carthage", names: ["Hannibal"], certainty: "attested" }], result: "Carthaginian cavalry victory", summary: "A cavalry and light-troop clash in which the consul Scipio was wounded and Roman forces withdrew across the Po.", significance: "The first Italian engagement revealed Carthaginian superiority in cavalry and set the pattern of the campaign.", ancientSourceIds: secondAncient, modernSourceIds: secondModern, uncertaintyNotes: ["Sources compress the maneuvering around the Po.", "The engagement’s scale is modest and imprecisely located."], previousSlug: "alps-crossing", nextSlug: "trebia"
  },
  {
    id: "trebia", slug: "trebia", name: "Battle of the Trebia", kind: "land", startYear: -218, endYear: -218, displayDate: "December 218 BCE", location: "West of Placentia (Piacenza), by the river Trebia", coordinates: [9.66, 44.99], uncertainty: { radiusKm: 12, certainty: "probable", note: "The river setting is accepted; the battle line is reconstructed." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Tiberius Sempronius Longus"], certainty: "attested" }, { faction: "carthage", names: ["Hannibal"], certainty: "attested" }], result: "Decisive Carthaginian victory", summary: "Hannibal drew a cold, hungry Roman army across the river and broke it with a concealed flanking force under his brother Mago.", significance: "Rome’s first major defeat of the war and an early model of Hannibal’s use of terrain and ambush.", ancientSourceIds: secondAncient, modernSourceIds: secondModern, uncertaintyNotes: ["The bank on which the main action was fought is debated.", "Casualty totals derive from literary narrative."], previousSlug: "ticinus", nextSlug: "trasimene"
  },
  {
    id: "trasimene", slug: "trasimene", name: "Battle of Lake Trasimene", kind: "land", startYear: -217, endYear: -217, displayDate: "June 217 BCE", location: "Northern shore of Lake Trasimene, near Tuoro", coordinates: [12.10, 43.25], uncertainty: { radiusKm: 8, certainty: "probable", note: "The lakeside defile is accepted; the exact ambush frontage is reconstructed." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Gaius Flaminius"], certainty: "attested" }, { faction: "carthage", names: ["Hannibal"], certainty: "attested" }], result: "Decisive Carthaginian victory", summary: "Hannibal ambushed the marching army of the consul Flaminius in morning mist along the lake shore, destroying it; Flaminius was killed.", significance: "One of the largest ambushes in ancient warfare; it opened the road toward Rome and led to the dictatorship of Fabius Maximus.", ancientSourceIds: secondAncient, modernSourceIds: secondModern, uncertaintyNotes: ["The precise line of the Roman column and the killing ground are reconstructed from the terrain.", "Reported Roman losses come through the literary tradition."], previousSlug: "trebia", nextSlug: "cannae"
  },
  {
    id: "cannae", slug: "cannae", name: "Battle of Cannae", kind: "land", startYear: -216, endYear: -216, displayDate: "2 August 216 BCE (traditional)", location: "Near Cannae on the Aufidus (Ofanto) river, Apulia", coordinates: [16.132, 41.306], uncertainty: { radiusKm: 10, certainty: "probable", note: "The general locality is accepted; the bank and orientation of the line remain debated." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Lucius Aemilius Paullus", "Gaius Terentius Varro"], certainty: "attested" }, { faction: "carthage", names: ["Hannibal"], certainty: "attested" }], result: "Decisive Carthaginian victory", summary: "Hannibal enveloped a much larger Roman army with a deliberately yielding center and encircling wings, destroying it almost entirely.", significance: "Rome’s worst battlefield defeat and the classic example of double envelopment; yet Rome refused terms and the war went on.",
    context: "After Trasimene, Rome raised an exceptionally large consular army—ancient sources suggest around eight legions with their allies—and set aside Fabian caution to force a decision. Polybius’ narrative underlies most reconstructions of the encirclement.",
    forces: [
      { side: "Rome", estimate: "Around 80,000 foot and 6,000 horse in the ancient tradition", certainty: "disputed", note: "Modern estimates vary and may be lower." },
      { side: "Carthage", estimate: "Around 40,000 foot and 10,000 horse", certainty: "disputed", note: "The mix of Libyan, Iberian, Gallic, and Numidian troops is better attested than the exact totals." },
    ],
    casualties: [
      { side: "Rome", estimate: "Tens of thousands killed or captured in the sources", certainty: "disputed", note: "Polybius and Livy give differing, very high figures." },
      { side: "Carthage", estimate: "Comparatively light losses reported", certainty: "disputed" },
    ],
    moments: [
      { title: "Advancing crescent", description: "Hannibal pushed his Gallic and Iberian center forward, inviting the Roman mass to drive into it.", certainty: "attested" },
      { title: "The center yields", description: "Under pressure the center fell back in order, drawing the deep Roman formation inward.", certainty: "probable" },
      { title: "Cavalry clears the flanks", description: "Heavy and Numidian horse drove off the Roman cavalry, then returned toward the Roman rear.", certainty: "probable" },
      { title: "Encirclement", description: "African infantry on the wings turned inward while the returning cavalry closed the ring.", certainty: "attested" },
    ],
    ancientSourceIds: ["polybius-3", "livy-21-30"], modernSourceIds: ["lazenby-1978", "goldsworthy-2000"], uncertaintyNotes: ["Whether the line stood on the left or right bank of the Aufidus is disputed.", "The very high casualty figures are literary and not independently verifiable.", "Exact army sizes are debated."], previousSlug: "trasimene", nextSlug: "capua"
  },
  {
    id: "capua", slug: "capua", name: "Siege of Capua", kind: "siege", startYear: -212, endYear: -211, displayDate: "212–211 BCE", location: "Capua (Santa Maria Capua Vetere), Campania", coordinates: [14.25, 41.08], uncertainty: { radiusKm: 6, certainty: "probable", note: "The city is secure; the Roman lines of circumvallation are generalized." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Quintus Fulvius Flaccus", "Appius Claudius Pulcher"], certainty: "probable" }, { faction: "carthage", names: ["Hannibal (failed relief)"], certainty: "attested" }], result: "Roman recapture of the city", summary: "Rome besieged Capua, which had defected after Cannae; Hannibal’s march toward Rome failed to draw off the besiegers, and the city fell in 211.", significance: "The fall of Capua showed that defection to Hannibal could not be protected, and the war’s momentum began to shift to Rome.", ancientSourceIds: secondAncient, modernSourceIds: secondModern, uncertaintyNotes: ["The chronology of the siege and Hannibal’s demonstration against Rome is compressed in the sources.", "The scale of the reprisals against Capua is variously reported."], previousSlug: "cannae", nextSlug: "new-carthage"
  },
  {
    id: "new-carthage", slug: "new-carthage", name: "Capture of New Carthage", kind: "siege", startYear: -209, endYear: -209, displayDate: "209 BCE", location: "Carthago Nova (Cartagena), south-eastern Iberia", coordinates: [-0.983, 37.6], uncertainty: { radiusKm: 5, certainty: "probable", note: "The harbour city is secure; the assault route across the lagoon is reconstructed." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Publius Cornelius Scipio (Africanus)"], certainty: "attested" }, { faction: "carthage", names: ["Mago (garrison commander)"], certainty: "probable" }], result: "Roman assault captures the city", summary: "Scipio made a rapid march and stormed the main Carthaginian base in Iberia, reportedly exploiting shallow water in the lagoon to reach the walls.", significance: "The capture seized Carthage’s Iberian treasury, arsenal, and hostages, turning the Spanish theatre in Rome’s favour.", ancientSourceIds: secondAncient, modernSourceIds: secondModern, uncertaintyNotes: ["The mechanism of the lagoon crossing (wind, tide, or ford) is debated.", "The speed of the march and assault may be idealized in the tradition."], previousSlug: "capua", nextSlug: "baecula"
  },
  {
    id: "baecula", slug: "baecula", name: "Battle of Baecula", kind: "land", startYear: -208, endYear: -208, displayDate: "208 BCE", location: "Near Baecula, upper Guadalquivir (site debated)", coordinates: [-3.1, 38.03], uncertainty: { radiusKm: 30, certainty: "disputed", note: "The identification with a modern site is contested." }, major: false,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Publius Cornelius Scipio (Africanus)"], certainty: "attested" }, { faction: "carthage", names: ["Hasdrubal Barca"], certainty: "attested" }], result: "Roman tactical victory; Hasdrubal withdraws", summary: "Scipio drove Hasdrubal Barca from a strong hill position, but much of the Carthaginian army escaped northward toward the Pyrenees and Italy.", significance: "A Roman success that nonetheless failed to stop Hasdrubal’s march to reinforce Hannibal.", ancientSourceIds: secondAncient, modernSourceIds: secondModern, uncertaintyNotes: ["The battlefield location is disputed among several Guadalquivir sites.", "How much of Hasdrubal’s force escaped is debated."], previousSlug: "new-carthage", nextSlug: "metaurus"
  },
  {
    id: "metaurus", slug: "metaurus", name: "Battle of the Metaurus", kind: "land", startYear: -207, endYear: -207, displayDate: "207 BCE", location: "Along the river Metaurus, near Fanum Fortunae (Fano)", coordinates: [12.9, 43.7], uncertainty: { radiusKm: 20, certainty: "disputed", note: "The action is fixed to the river, but the precise field is uncertain." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Gaius Claudius Nero", "Marcus Livius Salinator"], certainty: "attested" }, { faction: "carthage", names: ["Hasdrubal Barca"], certainty: "attested" }], result: "Decisive Roman victory; Hasdrubal killed", summary: "Claudius Nero slipped away from facing Hannibal in the south, joined his colleague in the north, and destroyed Hasdrubal’s relieving army before it could reach Hannibal.", significance: "By ending the reinforcement Hannibal awaited, the Metaurus is often read as the strategic turning point of the war in Italy.", ancientSourceIds: secondAncient, modernSourceIds: secondModern, uncertaintyNotes: ["The exact battlefield along the Metauro is not established.", "The dramatic account of Nero’s forced march is shaped by later tradition."], previousSlug: "baecula", nextSlug: "ilipa"
  },
  {
    id: "ilipa", slug: "ilipa", name: "Battle of Ilipa", kind: "land", startYear: -206, endYear: -206, displayDate: "206 BCE", location: "Near Ilipa, lower Guadalquivir (Alcalá del Río)", coordinates: [-5.98, 37.52], uncertainty: { radiusKm: 15, certainty: "probable", note: "The general area is accepted; the deployment is reconstructed from Polybius." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Publius Cornelius Scipio (Africanus)"], certainty: "attested" }, { faction: "carthage", names: ["Hasdrubal Gisco", "Mago"], certainty: "attested" }], result: "Decisive Roman victory", summary: "Scipio reversed his usual order of battle to set his best troops on the wings and enveloped the Carthaginian army, effectively ending Carthaginian power in Iberia.", significance: "Ilipa secured the peninsula for Rome and freed Scipio to plan the invasion of Africa.", ancientSourceIds: secondAncient, modernSourceIds: secondModern, uncertaintyNotes: ["The tactical reconstruction depends heavily on Polybius.", "Army sizes are debated."], previousSlug: "metaurus", nextSlug: "great-plains"
  },
  {
    id: "great-plains", slug: "great-plains", name: "Battle of the Great Plains", kind: "land", startYear: -203, endYear: -203, displayDate: "203 BCE", location: "Bagradas (Medjerda) valley, the Campi Magni, Africa", coordinates: [9.0, 36.4], uncertainty: { radiusKm: 35, certainty: "disputed", note: "The ‘Great Plains’ district is broadly placed on the upper Bagradas." }, major: false,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Publius Cornelius Scipio (Africanus)"], certainty: "attested" }, { faction: "carthage", names: ["Hasdrubal Gisco", "Syphax"], certainty: "attested" }], result: "Decisive Roman victory", summary: "Days after burning the Carthaginian and Numidian camps, Scipio defeated the hastily reassembled army on open ground, tightening the pressure on Carthage.", significance: "The defeat pushed Carthage to recall Hannibal from Italy and to seek a decision in Africa.", ancientSourceIds: secondAncient, modernSourceIds: secondModern, uncertaintyNotes: ["The exact location of the Campi Magni is not fixed.", "The sequence with the preceding ‘Battle of the Camps’ is compressed in the sources."], previousSlug: "ilipa", nextSlug: "zama"
  },
  {
    id: "zama", slug: "zama", name: "Battle of Zama", kind: "land", startYear: -202, endYear: -202, displayDate: "202 BCE", location: "Interior of modern Tunisia, near Zama (exact site disputed)", coordinates: [9.55, 36.05], uncertainty: { radiusKm: 45, certainty: "disputed", note: "No securely identified battlefield; several inland sites west of Carthage are proposed." }, major: true,
    belligerents: ["Roman Republic", "Carthage"], commanders: [{ faction: "rome", names: ["Publius Cornelius Scipio (Africanus)", "Masinissa (allied Numidian king)"], certainty: "attested" }, { faction: "carthage", names: ["Hannibal"], certainty: "attested" }], result: "Decisive Roman victory", summary: "Scipio defeated Hannibal in a pitched battle in which Numidian cavalry, now largely on the Roman side, proved decisive; the elephant charge was blunted and the Carthaginian line eventually enveloped.", significance: "Zama ended the Second Punic War, confined Carthage to Africa under harsh terms, and earned Scipio the name ‘Africanus’.",
    context: "The battle brought the war’s two greatest commanders together on open ground. Its most consequential feature was the reversal of the cavalry balance: Masinissa’s Numidians now fought for Rome, undoing the advantage that had won Cannae.",
    forces: [
      { side: "Rome", estimate: "Roman and Italian legions with strong allied Numidian cavalry", certainty: "probable", note: "Exact totals are uncertain." },
      { side: "Carthage", estimate: "A mixed army of mercenaries, citizen levies, Hannibal’s veterans, and war elephants", certainty: "probable", note: "The veteran core is emphasized in the sources." },
    ],
    casualties: [
      { side: "Carthage", estimate: "Very heavy losses reported", certainty: "disputed" },
      { side: "Rome", estimate: "Substantially lighter losses reported", certainty: "disputed" },
    ],
    moments: [
      { title: "Elephant charge", description: "Hannibal opened with elephants; Roman lanes and noise disrupted the charge.", certainty: "probable" },
      { title: "Infantry lines meet", description: "Successive lines of infantry ground against one another in a prolonged struggle.", certainty: "probable" },
      { title: "Cavalry returns", description: "The allied Numidian and Roman cavalry, having driven off their opponents, struck Hannibal’s rear.", certainty: "attested" },
      { title: "Envelopment", description: "Caught front and rear, the Carthaginian line collapsed.", certainty: "probable" },
    ],
    ancientSourceIds: ["polybius-3", "livy-21-30", "appian-hann"], modernSourceIds: ["lazenby-1978", "goldsworthy-2000"], uncertaintyNotes: ["The battlefield has never been securely located.", "Whether the site was Zama, Naraggara, or elsewhere is debated.", "Army sizes and casualty figures are literary."], previousSlug: "great-plains"
  },
];

const macedonianWar: Battle[] = [
  {
    id: "aous", slug: "aous", name: "Battle of the Aous", kind: "land", startYear: -198, endYear: -198, displayDate: "198 BCE", location: "The Aoös (Vjosa) gorge, Epirus", coordinates: [20.2, 40.1], uncertainty: { radiusKm: 20, certainty: "disputed", note: "The river gorge is known; the precise point of the forced passage is debated." }, major: false,
    belligerents: ["Roman Republic", "Macedon"], commanders: [{ faction: "rome", names: ["Titus Quinctius Flamininus"], certainty: "attested" }, { faction: "macedon", names: ["Philip V"], certainty: "attested" }], result: "Roman victory", summary: "Flamininus forced Philip’s fortified position blocking the Aoös gorge, compelling a Macedonian retreat into Thessaly.", significance: "The breakthrough opened Macedonia’s southern approaches and shifted the war’s momentum to Rome.", ancientSourceIds: macedonAncient, modernSourceIds: macedonModern, uncertaintyNotes: ["The precise point of the forced passage is debated.", "The role of a local guide is reported but hard to verify."], nextSlug: "cynoscephalae"
  },
  {
    id: "cynoscephalae", slug: "cynoscephalae", name: "Battle of Cynoscephalae", kind: "land", startYear: -197, endYear: -197, displayDate: "197 BCE", location: "The Cynoscephalae (‘Dog’s Heads’) ridges, Thessaly", coordinates: [22.55, 39.42], uncertainty: { radiusKm: 15, certainty: "disputed", note: "The hill line is placed between Pherae and Scotussa, but not securely fixed." }, major: true,
    belligerents: ["Roman Republic and allies", "Macedon"], commanders: [{ faction: "rome", names: ["Titus Quinctius Flamininus"], certainty: "attested" }, { faction: "macedon", names: ["Philip V"], certainty: "attested" }], result: "Decisive Roman victory", summary: "The Roman legions, exploiting broken ground and their flexibility, shattered Philip V’s phalanx and ended the war.", significance: "Cynoscephalae showed the manipular legion’s advantage over the phalanx on rough terrain and made Rome the arbiter of the Greek world.",
    context: "Rome and Macedon had manoeuvred inconclusively until the two armies blundered into each other in fog on the ridges called the Dog’s Heads. The battle became the classic test of the Macedonian pike phalanx against the Roman manipular legion on ground that suited the legion.",
    forces: [
      { side: "Rome", estimate: "About 26,000, with Aetolian and allied cavalry and a few war elephants", certainty: "probable", note: "Totals follow Polybius and Livy." },
      { side: "Macedon", estimate: "A comparable force built around the pike phalanx", certainty: "probable", note: "Exact numbers are uncertain." },
    ],
    casualties: [
      { side: "Macedon", estimate: "Ancient sources report about 8,000 killed and 5,000 captured", certainty: "disputed", note: "Figures come through the literary tradition." },
      { side: "Rome", estimate: "Reported as relatively light", certainty: "disputed" },
    ],
    moments: [
      { title: "Meeting in the fog", description: "Advance guards collided unexpectedly on the wet heights; both sides fed in troops piecemeal.", certainty: "attested" },
      { title: "The right phalanx charges", description: "Philip’s right, well formed on the high ground, drove the Roman left back.", certainty: "probable" },
      { title: "Broken ground opens gaps", description: "Advancing downhill, the phalanx lost cohesion and its dense front fragmented.", certainty: "probable" },
      { title: "A tribune turns the flank", description: "An unnamed tribune wheeled maniples from the victorious Roman right into the phalanx’s exposed rear.", certainty: "attested" },
    ],
    ancientSourceIds: macedonAncient, modernSourceIds: macedonModern, uncertaintyNotes: ["The exact hills of the ‘Dog’s Heads’ are not securely located.", "Casualty and strength figures are literary.", "The decisive flanking manoeuvre is credited to an unnamed tribune."], previousSlug: "aous"
  },
];

export const battles: Battle[] = [
  ...firstPunicWar.map((battle) => ({ ...battle, war: "first-punic" })),
  ...secondPunicWar.map((battle) => ({ ...battle, war: "second-punic" })),
  ...macedonianWar.map((battle) => ({ ...battle, war: "macedonian-second" })),
];

export function getBattle(slug: string): Battle | undefined {
  return battles.find((battle) => battle.slug === slug);
}
