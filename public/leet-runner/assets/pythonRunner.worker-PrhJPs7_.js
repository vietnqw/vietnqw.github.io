(function(){"use strict";const b=`
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
`,P=`
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
`;let e=null,l=null,d=null;const f=async()=>l||(l=(async()=>{try{d||(d=(await import("https://cdn.jsdelivr.net/pyodide/v0.29.0/full/pyodide.mjs")).loadPyodide),e=await d({indexURL:"https://cdn.jsdelivr.net/pyodide/v0.29.0/full/"}),postMessage({type:"loaded"})}catch(r){console.error("Failed to load Pyodide",r),postMessage({type:"error",error:"Failed to load Python runtime"})}})(),l);let s=[],n=[];const x=r=>s.push(r),w=r=>n.push(r);self.onmessage=async r=>{const{type:y,code:j,methodName:E,testCases:h}=r.data;if(y==="init"){await f();return}if(y==="run"){if(e||await f(),!e)return;s=[],n=[],e.setStdout({batched:x}),e.setStderr({batched:w});try{e.runPython(P)}catch(t){console.error("Prelude error",t)}let g=!0;try{await e.runPythonAsync(j)}catch(t){g=!1;const p=t.toString(),o=[...s,...n],c=o.join(""),a=(!c.includes(`
`)&&!c.includes("\r")&&o.length>1?o.join(`
`):c).replace(/\r\n/g,`
`).trimEnd();h.forEach(i=>{postMessage({type:"result",caseId:i.id,result:{passed:!1,actual:"",output:a||void 0,error:p,executionTime:0}})}),postMessage({type:"finished"});return}try{e.runPython(b)}catch(t){console.error("Harness error",t)}const _=e.globals.get("_run_leetcode_case");for(const t of h){s=[],n=[];const p=performance.now();let o;try{const u=_(g,E,t.args);o=u.toJs(),u.destroy()}catch(u){o={error:u.toString()}}const m=performance.now()-p,a=[...s,...n],i=a.join(""),S=(!i.includes(`
`)&&!i.includes("\r")&&a.length>1?a.join(`
`):i).replace(/\r\n/g,`
`).trimEnd();o.error?postMessage({type:"result",caseId:t.id,result:{passed:!1,actual:"",output:S||void 0,error:o.error,executionTime:m}}):postMessage({type:"result",caseId:t.id,result:{passed:!0,actual:o.actual,output:S||void 0,executionTime:m}})}_.destroy(),postMessage({type:"finished"})}}})();
