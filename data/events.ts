import type { HistoricalEvent } from "@/types/history";

const firstPunicEvents: HistoricalEvent[] = [
  { id: "e264", year: -264, title: "Rome crosses to Sicily", summary: "Roman intervention at Messana expands into open war with Carthage.", certainty: "attested", battleSlug: "messana" },
  { id: "e263", year: -263, title: "Syracuse changes sides", summary: "Hiero II reaches terms with Rome, strengthening Roman logistics in Sicily.", certainty: "attested" },
  { id: "e262", year: -262, title: "Agrigentum invested", summary: "Roman armies begin the war’s first great siege.", certainty: "attested", battleSlug: "agrigentum" },
  { id: "e261", year: -261, title: "Agrigentum falls", summary: "Rome captures Akragas after defeating a Carthaginian relief force.", certainty: "attested", battleSlug: "agrigentum" },
  { id: "e260", year: -260, title: "A naval power emerges", summary: "Duilius wins Rome’s first major sea victory at Mylae.", certainty: "attested", battleSlug: "mylae" },
  { id: "e259", year: -259, title: "War widens", summary: "Operations extend toward Sardinia and Corsica; surviving accounts are fragmentary.", certainty: "probable" },
  { id: "e258", year: -258, title: "Fighting near Sulci", summary: "A Roman fleet wins a poorly documented encounter off Sardinia.", certainty: "disputed", battleSlug: "sulci" },
  { id: "e257", year: -257, title: "Clash at Tyndaris", summary: "A sudden engagement off northern Sicily ends without decisive strategic change.", certainty: "probable", battleSlug: "tyndaris" },
  { id: "e256", year: -256, title: "The war crosses to Africa", summary: "Victory at Ecnomus enables a Roman landing near Aspis.", certainty: "attested", battleSlug: "cape-ecnomus" },
  { id: "e255", year: -255, title: "Regulus defeated", summary: "After success at Adys, the Roman expedition is destroyed on the Bagradas plain.", certainty: "attested", battleSlug: "bagradas" },
  { id: "e254", year: -254, title: "Panormus captured", summary: "Roman forces take the major north-Sicilian port.", certainty: "attested" },
  { id: "e253", year: -253, title: "Costly maritime campaigning", summary: "Roman operations on the African coast are followed by another destructive storm.", certainty: "probable" },
  { id: "e252", year: -252, title: "Pressure on western Sicily", summary: "Roman advances narrow the Carthaginian position in Sicily.", certainty: "probable" },
  { id: "e251", year: -251, title: "War of positions", summary: "Both sides maneuver around the remaining Carthaginian strongholds.", certainty: "probable" },
  { id: "e250", year: -250, title: "Panormus and Lilybaeum", summary: "Rome wins at Panormus and begins the long siege of Lilybaeum.", certainty: "attested", battleSlug: "panormus" },
  { id: "e249", year: -249, title: "Disaster at Drepana", summary: "Adherbal defeats a Roman fleet attempting a surprise attack.", certainty: "attested", battleSlug: "drepana" },
  { id: "e248", year: -248, title: "The siege continues", summary: "Lilybaeum remains supplied by sea despite Roman pressure.", certainty: "attested", battleSlug: "lilybaeum" },
  { id: "e247", year: -247, title: "Hamilcar takes command", summary: "Hamilcar Barca begins operations from the heights near Panormus.", certainty: "attested" },
  { id: "e246", year: -246, title: "Stalemate in western Sicily", summary: "Raids and positional warfare replace large set-piece battles.", certainty: "probable" },
  { id: "e245", year: -245, title: "Mount Eryx contested", summary: "Carthaginian and Roman forces struggle over positions commanding Drepana.", certainty: "probable" },
  { id: "e244", year: -244, title: "A war of endurance", summary: "Neither side can force a decision around the western ports.", certainty: "probable" },
  { id: "e243", year: -243, title: "Rome finances a new fleet", summary: "Private contributions support construction of a renewed Roman navy.", certainty: "attested" },
  { id: "e242", year: -242, title: "Blockade tightens", summary: "The new Roman fleet drills and restricts Carthaginian access to western Sicily.", certainty: "probable" },
  { id: "e241", year: -241, title: "Victory at the Aegates", summary: "Rome defeats the relief fleet; peace ends the First Punic War.", certainty: "attested", battleSlug: "aegates" },
];

const interbellumEvents: HistoricalEvent[] = [
  { id: "e240", year: -240, title: "The Mercenary War", summary: "Carthage’s unpaid mercenaries and Libyan subjects revolt in a brutal war for survival at home.", certainty: "attested", war: "interbellum" },
  { id: "e238", year: -238, title: "Rome seizes Sardinia", summary: "Exploiting Carthage’s weakness, Rome annexes Sardinia and Corsica and raises the indemnity.", certainty: "attested", war: "interbellum" },
  { id: "e237", year: -237, title: "The Barcids enter Iberia", summary: "Hamilcar Barca begins building a Carthaginian power base and army in Spain.", certainty: "attested", war: "interbellum" },
  { id: "e229", year: -229, title: "Hasdrubal succeeds Hamilcar", summary: "After Hamilcar’s death, his son-in-law Hasdrubal consolidates the Iberian province and founds New Carthage.", certainty: "probable", war: "interbellum" },
  { id: "e226", year: -226, title: "The Ebro agreement", summary: "Rome and Hasdrubal reportedly fix the Ebro as a limit of Carthaginian expansion.", certainty: "probable", war: "interbellum" },
  { id: "e221", year: -221, title: "Hannibal takes command", summary: "At about 26, Hannibal assumes command of Carthaginian forces in Iberia.", certainty: "attested", war: "interbellum" },
  { id: "e220", year: -220, title: "Tension over Saguntum", summary: "Roman diplomacy and Carthaginian ambition collide over the allied city of Saguntum.", certainty: "probable", war: "interbellum" },
];

const secondPunicEvents: HistoricalEvent[] = [
  { id: "e219", year: -219, title: "Saguntum falls", summary: "Hannibal storms Saguntum; Rome demands his surrender and, refused, declares war.", certainty: "attested", battleSlug: "saguntum", war: "second-punic" },
  { id: "e218", year: -218, title: "Hannibal crosses the Alps", summary: "After Ticinus and Trebia, Hannibal is established in northern Italy.", certainty: "attested", battleSlug: "alps-crossing", war: "second-punic" },
  { id: "e217", year: -217, title: "Ambush at Lake Trasimene", summary: "Hannibal destroys Flaminius’ army; Rome appoints Fabius Maximus dictator.", certainty: "attested", battleSlug: "trasimene", war: "second-punic" },
  { id: "e216", year: -216, title: "Catastrophe at Cannae", summary: "A vast Roman army is encircled and destroyed; several Italian communities defect.", certainty: "attested", battleSlug: "cannae", war: "second-punic" },
  { id: "e215", year: -215, title: "The war widens", summary: "Capua defects, and Carthage allies with Macedon; the conflict spreads beyond Italy.", certainty: "probable", war: "second-punic" },
  { id: "e214", year: -214, title: "Sicily and Syracuse", summary: "Syracuse turns against Rome; a long siege under Marcellus begins.", certainty: "probable", war: "second-punic" },
  { id: "e213", year: -213, title: "War of sieges", summary: "Fighting settles into sieges and raids across Italy and Sicily.", certainty: "probable", war: "second-punic" },
  { id: "e212", year: -212, title: "Rome invests Capua", summary: "Roman armies besiege Capua; Syracuse is stormed and Tarentum is lost to Hannibal.", certainty: "attested", war: "second-punic" },
  { id: "e211", year: -211, title: "Capua retaken", summary: "Hannibal’s march on Rome fails to save Capua, which surrenders and is punished.", certainty: "attested", battleSlug: "capua", war: "second-punic" },
  { id: "e210", year: -210, title: "Scipio to Spain", summary: "The young Publius Cornelius Scipio takes command of the Roman effort in Iberia.", certainty: "probable", war: "second-punic" },
  { id: "e209", year: -209, title: "New Carthage stormed", summary: "Scipio captures the Barcid capital in a single assault, seizing its resources.", certainty: "attested", battleSlug: "new-carthage", war: "second-punic" },
  { id: "e208", year: -208, title: "Baecula", summary: "Scipio defeats Hasdrubal Barca, who nonetheless escapes toward Italy.", certainty: "probable", battleSlug: "baecula", war: "second-punic" },
  { id: "e207", year: -207, title: "Decision at the Metaurus", summary: "Hasdrubal’s relieving army is destroyed before it can reach Hannibal.", certainty: "attested", battleSlug: "metaurus", war: "second-punic" },
  { id: "e206", year: -206, title: "Ilipa clears Iberia", summary: "Scipio’s victory ends Carthaginian power in Spain.", certainty: "attested", battleSlug: "ilipa", war: "second-punic" },
  { id: "e205", year: -205, title: "Preparing for Africa", summary: "Elected consul, Scipio assembles an army in Sicily for an invasion of Africa.", certainty: "probable", war: "second-punic" },
  { id: "e204", year: -204, title: "Landing in Africa", summary: "Scipio crosses to Africa and, with Masinissa, campaigns near Utica.", certainty: "probable", war: "second-punic" },
  { id: "e203", year: -203, title: "The Great Plains", summary: "Scipio wins in the Bagradas valley; Carthage recalls Hannibal from Italy.", certainty: "attested", battleSlug: "great-plains", war: "second-punic" },
  { id: "e202", year: -202, title: "Zama decides the war", summary: "Scipio defeats Hannibal in Africa in the war’s final pitched battle.", certainty: "attested", battleSlug: "zama", war: "second-punic" },
  { id: "e201", year: -201, title: "Carthage accepts terms", summary: "Carthage surrenders its fleet and Iberia, pays a large indemnity, and is barred from war without Roman consent.", certainty: "attested", war: "second-punic" },
];

const macedonianEvents: HistoricalEvent[] = [
  { id: "e200", year: -200, title: "Rome turns east", summary: "Barely out of the war with Carthage, Rome declares war on Philip V of Macedon.", certainty: "attested", war: "macedonian-second" },
  { id: "e199", year: -199, title: "War in the passes", summary: "Roman forces probe Macedonia’s western frontier with little decisive result.", certainty: "probable", war: "macedonian-second" },
  { id: "e198", year: -198, title: "Breakthrough at the Aous", summary: "Flamininus forces the Aoös gorge and pushes Philip back into Thessaly.", certainty: "attested", battleSlug: "aous", war: "macedonian-second" },
  { id: "e197", year: -197, title: "Decision at Cynoscephalae", summary: "The legion defeats the phalanx; Philip sues for peace.", certainty: "attested", battleSlug: "cynoscephalae", war: "macedonian-second" },
  { id: "e196", year: -196, title: "Freedom of the Greeks", summary: "At the Isthmian Games, Flamininus proclaims the Greek cities free — under Roman oversight.", certainty: "attested", war: "macedonian-second" },
];

export const historicalEvents: HistoricalEvent[] = [
  ...firstPunicEvents.map((event) => ({ ...event, war: "first-punic" })),
  ...interbellumEvents,
  ...secondPunicEvents,
  ...macedonianEvents,
];
