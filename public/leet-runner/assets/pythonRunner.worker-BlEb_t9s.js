(function(){"use strict";const S=`
import sys
import json
import traceback

# Global state to hold the solution instance if needed, 
# but usually we re-instantiate or just call the method.

def _run_leetcode_case(code_exec_success, method_name, args_lines):
    if not code_exec_success:
        return {"error": "User code failed to execute (syntax error?)"}

    # Ensure Solution class exists
    if 'Solution' not in globals():
        return {"error": "Class 'Solution' not found. Please define class Solution."}
    
    try:
        sol_class = globals()['Solution']
        sol = sol_class()
        
        # Find method
        if not hasattr(sol, method_name):
            return {"error": f"Method '{method_name}' not found in Solution class."}
        
        method = getattr(sol, method_name)
        
        # Parse args
        args = []
        for line in args_lines.split('\\n'):
            if line.strip():
                try:
                    args.append(json.loads(line))
                except json.JSONDecodeError as e:
                    return {"error": f"Invalid JSON in arguments: {str(e)}"}
        
        # Call method
        result = method(*args)
        
        # Render result
        try:
            # Try to serialize to JSON to be unambiguous
            actual = json.dumps(result, ensure_ascii=False)
        except (TypeError, OverflowError):
            # Fallback to string representation
            actual = str(result)
            
        return {"passed": True, "actual": actual}
        
    except Exception:
        return {"error": traceback.format_exc()}
`,b=`
# Common LeetCode-style helpers (auto-imported before user code)
import sys
import math
import re
import heapq
import bisect
import itertools
import functools
import operator
import collections

from typing import (
    Any,
    Callable,
    Deque,
    DefaultDict,
    Dict,
    Iterable,
    Iterator,
    List,
    Optional,
    Set,
    Tuple,
    Union,
)

from collections import deque, defaultdict, Counter
`;let e=null,s=null,i=null;const p=async()=>s||(s=(async()=>{try{i||(i=(await import("https://cdn.jsdelivr.net/pyodide/v0.29.0/full/pyodide.mjs")).loadPyodide),e=await i({indexURL:"https://cdn.jsdelivr.net/pyodide/v0.29.0/full/"}),postMessage({type:"loaded"})}catch(r){console.error("Failed to load Pyodide",r),postMessage({type:"error",error:"Failed to load Python runtime"})}})(),s);let n=[],a=[];const P=r=>n.push(r),x=r=>a.push(r);self.onmessage=async r=>{const{type:m,code:w,methodName:E,testCases:f}=r.data;if(m==="init"){await p();return}if(m==="run"){if(e||await p(),!e)return;n=[],a=[],e.setStdout({batched:P}),e.setStderr({batched:x});try{e.runPython(b)}catch(t){console.error("Prelude error",t)}let y=!0;try{await e.runPythonAsync(w)}catch(t){y=!1;const c=t.toString();f.forEach(o=>{postMessage({type:"result",caseId:o.id,result:{passed:!1,actual:"",error:c,executionTime:0}})}),postMessage({type:"finished"});return}try{e.runPython(S)}catch(t){console.error("Harness error",t)}const h=e.globals.get("_run_leetcode_case");for(const t of f){n=[],a=[];const c=performance.now();let o;try{const l=h(y,E,t.args);o=l.toJs(),l.destroy()}catch(l){o={error:l.toString()}}const g=performance.now()-c,u=[...n,...a],d=u.join(""),_=(!d.includes(`
`)&&!d.includes("\r")&&u.length>1?u.join(`
`):d).replace(/\r\n/g,`
`).trimEnd();o.error?postMessage({type:"result",caseId:t.id,result:{passed:!1,actual:"",output:_||void 0,error:o.error,executionTime:g}}):postMessage({type:"result",caseId:t.id,result:{passed:!0,actual:o.actual,output:_||void 0,executionTime:g}})}h.destroy(),postMessage({type:"finished"})}}})();
